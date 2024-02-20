import { SEP, createDirs, type struct } from "./create-dirs"


export const PROJECT_TYPES = ["Concept-Props", "Editorial", "Motion", "Script", "Story",] as const

export const normalizeTitle = (title: string): string => {
    return title.replace(/([\s._,/\\-])+/g, " ")
        .toLocaleLowerCase()
        .split(" ")
        // .map(w => w[0].toUpperCase()+w.substring(1))
        .join("-")
}

const createScriptDirStruct = (season: string, episode: string, title: string): struct => {
    const titleNormalized = normalizeTitle(title)
    const paddedSeason = season.padStart(2, '0')
    const paddedEpisode = episode.padStart(2, '0')
    const ExportFormats: struct = { PDF: null, RTF: null }
    const LanguageExportTypes: struct = { Original: ExportFormats, Dialog: ExportFormats, "Dialog-Recorded": ExportFormats }
    return {
        [`S${paddedSeason}E${paddedEpisode}_${titleNormalized}`]: {
            Export: {
                ENG: LanguageExportTypes,
                ESP: LanguageExportTypes,
            },
            Script: {
                ["Previous-Versions"]: null,
                Translations: { ENG: null }
            }
        }
    }
}

export const createScriptDirs = async (rootPath: string, season: string, episode: string, title: string) => {
    const dirStruct = createScriptDirStruct(season, episode, title);
    try {
        await createDirs(rootPath, dirStruct)
        return true
    }
    catch(err) {
        console.error(err)
        return false
    }

}

const createStoryDirStruct = (season: string, episode: string, title: string): struct => {
    const titleNormalized = normalizeTitle(title)
    const paddedSeason = season.padStart(2, '0')
    const paddedEpisode = episode.padStart(2, '0')

    return {
        [`S${paddedSeason}E${paddedEpisode}_${titleNormalized}`]: {
            Export: null,
            ["Project-Files"]: {
                ["Previous-Versions"]: null
            },
            Resources: {
                Audio: null,
                Video: null,
            },
            ["Script-Reading"]: null,
            WIPs: null
        }
    }
}

export const createStoryDirs = async (rootPath: string, season: string, episode: string, title: string) => {
    const dirStruct = createStoryDirStruct(season, episode, title);
    try {
        await createDirs(rootPath, dirStruct)
        return true
    }
    catch(err) {
        console.error(err)
        return false
    }

}

const createConceptPropDirStruct = (season: string, episode: string, title: string): struct => {
    const titleNormalized = normalizeTitle(title)
    const paddedSeason = season.padStart(2, '0')
    const paddedEpisode = episode.padStart(2, '0')

    return {
        [`S${paddedSeason}E${paddedEpisode}_${titleNormalized}`]: {
            Final: {
                ["2D"]: null,
                ["3D"]: {
                    Maya: null,
                    Textures: null,
                    Zbrush: null,
                }
            },
            WIPs: {
                ["2D"]: null,
                ["3D"]: null,
            }
        }
    }
}

export const createConceptPropDirs = async (rootPath: string, season: string, episode: string, title: string) => {
    const dirStruct = createConceptPropDirStruct(season, episode, title);
    try {
        await createDirs(rootPath, dirStruct)
        return true
    }
    catch(err) {
        console.error(err)
        return false
    }
}

const createMotionDirStruct = (season: string, episode: string, title: string): struct => {
    const titleNormalized = normalizeTitle(title)
    const paddedSeason = season.padStart(2, '0')
    const paddedEpisode = episode.padStart(2, '0')

    return {
        [`S${paddedSeason}E${paddedEpisode}_${titleNormalized}`]: {
            Export: null,
            ["Project-Files"]: {
                ["Previous-Versions"]: null
            },
            Resources: {
                Audio: null,
                Video: null,
                Graphics: null
            },
            WIPs: null
        }
    }
}

export const createMotionDirs = async (rootPath: string, season: string, episode: string, title: string) => {
    const dirStruct = createMotionDirStruct(season, episode, title);
    try {
        await createDirs(rootPath, dirStruct)
        return true
    }
    catch(err) {
        console.error(err)
        return false
    }
}

const createEditorialDirStruct = (season: string, episode: string, title: string): struct => {
    const titleNormalized = normalizeTitle(title)
    const paddedSeason = season.padStart(2, '0')
    const paddedEpisode = episode.padStart(2, '0')

    return {
        [`S${paddedSeason}E${paddedEpisode}_${titleNormalized}`]: {
            AE: null,
            Export: null,
            ["Project-Files"]: {
                ["Previous-Versions"]: null
            },
            Resources: {
                Audio: {
                    Mix: {
                        ENG: {
                            STEMs: null
                        },
                        ESP: {
                            STEMs: null
                        }
                    },
                    Music: null,
                    Rec: null,
                    SFX: null
                },

                Video: {
                    "2D": null,
                    Alphas: null,
                    "Compo-Src": null,
                    Shots: null,
                    Story: null,
                },
                Graphics: null
            },
            WIPs: null
        }
    }
}

export const createEditorialDirs = async (rootPath: string, season: string, episode: string, title: string) => {
    const dirStruct = createEditorialDirStruct(season, episode, title);
    try {
        await createDirs(rootPath, dirStruct)
        return true
    }
    catch(err) {
        console.error(err)
        return false
    }
}
