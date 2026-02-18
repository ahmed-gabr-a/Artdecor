"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }), []);

    return (
        <div className="bg-white text-black">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                className="h-64 mb-12"
            />
        </div>
    );
}
