export const isValidHex = (hex: string | null | undefined): boolean =>
    /^#[0-9A-Fa-f]{6}$/.test(hex ?? '');

export const CORES = {
    btg: '#0083CB',
    xp: '#FF6B00',
    avenue: '#f97316',
    agora: '#16a34a',
    rendaFixa: '#0083CB',
    fundos: '#00B4D8',
    rendaVariavel: '#F59E0B',
    previdencia: '#8B5CF6',
    outros: '#6B7280',
};