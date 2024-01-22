import { SEP, createDirs, type struct } from "./create-dirs"

export const PROJECT_TYPES = ["Script", "Story"] as const


export const createScriptDirStruct = (season: string, episode: string, title: string): struct => {
    const titleNormalized = title.replace(/([\s._,/\\-])+/g, " ")
        .split(" ")
        .map(w => w[0].toUpperCase()+w.substring(1))
        .join("-")
    const paths: string[] = []
    const paddedSeason = season.padStart(2, '0')
    const paddedEpisode = episode.padStart(2, '0')
    const ExportFormats: struct = { PDF: null, RTF: null }
    const LanguageExportTypes: struct = { Original: ExportFormats, Dialog: ExportFormats, Dialog_Recorded: ExportFormats }
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

// const createStoryDirStruct = (season: string, episode: string, title: string): struct => {
//     const titleNormalized = title.replace(/([\s._,/\\-])+/g, " ")
//         .split(" ")
//         .map(w => w[0].toUpperCase()+w.substring(1))
//         .join("-")
    
// }
