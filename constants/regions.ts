export const REGIONS = {
    "Brikama": {
        name: "Brikama Region (West Coast)",
        locations: [
            "Santosu",
            "College",
            "Kiti",
            "Kabekel",
            "Kasasunda",
            "Jalambang",
            "Karton",
            "Medina"
        ]
    },
    "Kombo": {
        name: "Kombo Region",
        locations: [
            "Serekunda",
            "Fajara",
            "Bakau",
            "Kotu",
            "Kololi"
        ]
    },
    "Basse": {
        name: "Basse Region (Upper River)",
        locations: [
            "Basse",
            "Bansang",
            "Fatoto"
        ]
    },
    "Kanifing": {
        name: "Kanifing Region",
        locations: [
            "Kanifing",
            "Latrikunda",
            "Dippa Kunda"
        ]
    },
    "Banjul": {
        name: "Banjul Region",
        locations: [
            "Banjul",
            "Half Die"
        ]
    }
} as const;

export type RegionKey = keyof typeof REGIONS;

export const getLocationsForRegion = (region: string): readonly string[] => {
    return REGIONS[region as RegionKey]?.locations || [];
};

export const getAllRegions = (): RegionKey[] => {
    return Object.keys(REGIONS) as RegionKey[];
};

export const getRegionName = (region: string): string => {
    return REGIONS[region as RegionKey]?.name || region;
};