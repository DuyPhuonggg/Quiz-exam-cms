export type ButtonVariantType =
    | 'plain'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'monochromePlain';
export type ButtonTone = 'success' | 'critical' | 'lilac' | 'super';
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ModalType = {
    title?: string | null | undefined;
    subtitle?: string | null | undefined;
    saveContent?: string | null | undefined;
    cancelContent?: string | null | undefined;
    loading: boolean | undefined;
    alias: string | null | undefined;
    active: boolean;
};
