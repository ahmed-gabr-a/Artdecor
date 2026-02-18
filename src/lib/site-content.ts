
export type ContentType = 'text' | 'textarea' | 'image' | 'video';

export interface ContentItem {
    key: string;
    label: string;
    type: ContentType;
    section: string;
    defaultValue: string;
}

export const siteContentSchema: ContentItem[] = [
    // ── Hero Section ────────────────────────────────────────────────
    {
        key: 'hero_title',
        label: 'Main Title',
        type: 'textarea',
        section: 'Hero',
        defaultValue: 'Structure of Permanence\nLanguage of Status in\nBaroque Interiors',
    },
    {
        key: 'hero_subtitle',
        label: 'Subtitle',
        type: 'textarea',
        section: 'Hero',
        defaultValue: 'Driven by a passion for excess. In truth, the most beautiful architecture is control. Be analyzing the depth of the history, illuminated gold, and grounded marble, the interior is manipulated to project.',
    },
    {
        key: 'hero_video',
        label: 'Background Video URL',
        type: 'video',
        section: 'Hero',
        defaultValue: '/assets/library/videos/Whisk_ignhbjnilzy0qto50izinwytqmnhrtl2emnw0ym.mp4',
    },

    // ── About Section ──────────────────────────────────────────────
    {
        key: 'about_heading',
        label: 'About Heading',
        type: 'text',
        section: 'About',
        defaultValue: 'Creating Masterpieces',
    },
    {
        key: 'about_text',
        label: 'About Description',
        type: 'textarea',
        section: 'About',
        defaultValue: 'We specialize in creating luxurious interiors that stand the test of time.',
    },

    // ── Contact Section ────────────────────────────────────────────
    {
        key: 'contact_email',
        label: 'Contact Email',
        type: 'text',
        section: 'Contact',
        defaultValue: 'info@art-decor.com',
    },
    {
        key: 'contact_phone',
        label: 'Phone Number',
        type: 'text',
        section: 'Contact',
        defaultValue: '+20 123 456 7890',
    },
];
