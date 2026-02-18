
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { siteContentSchema } from '@/lib/site-content';




export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode');

    // 1. Fetch values from DB (Supabase or Local)
    let values: Record<string, string> = {};

    // Try Supabase first
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const { data, error } = await supabase.from('content_blocks').select('*');
            if (!error && data) {
                values = data.reduce((acc: any, item: any) => {
                    acc[item.key] = item.content;
                    return acc;
                }, {});
            }
        }
    } catch (e) {
        // Ignore supabase errors
    }

    // If Supabase empty or failed, try Local DB
    if (Object.keys(values).length === 0) {
        const { readLocalContent } = await import('@/lib/json-db');
        values = await readLocalContent();
    }

    // 2. Merge with Schema
    // We always return the full schema structure so the Admin UI knows what to render.
    // The 'value' for each item is: DB value > Local Value > Default Value
    const fullContent = siteContentSchema.map(item => ({
        ...item,
        value: values[item.key] || item.defaultValue
    }));

    if (mode === 'admin') {
        return NextResponse.json(fullContent);
    }

    // Front-end friendly object { key: value }
    const contentMap = fullContent.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

    return NextResponse.json(contentMap);
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { key, value } = body;

    // Try Supabase
    let supabaseSuccess = false;
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const { error } = await supabase
                .from('content_blocks')
                .upsert({ key, content: value }, { onConflict: 'key' }); // content not value
            if (!error) supabaseSuccess = true;
        }
    } catch (e) { }

    // Always save to Local DB as backup/primary for local user
    try {
        const { writeLocalContent } = await import('@/lib/json-db');
        await writeLocalContent(key, value);
    } catch (e) {
        console.error("Local save failed", e);
    }

    return NextResponse.json({ success: true, supabase: supabaseSuccess });
}

