import { filesystem } from '@neutralinojs/lib';


export interface struct {
    [key: string]: struct |  null
}

export const SEP = "/"

const isobject = (x: unknown) => {
    return Object.prototype.toString.call(x) === '[object Object]';
    };

const getDirPaths = (projectStruct: struct, prefix: string = '') => {
    var keys = Object.keys(projectStruct);
    prefix = prefix ? prefix + '/' : '';
    return keys.reduce(function(result: string[], key){
        if(isobject(projectStruct[key])){
            result = result.concat(getDirPaths(projectStruct[key]!, prefix + key));
        }else{
            result.push(prefix + key);
            
        }
        return result;
    }, []);
};

const getRecursivePaths = (rootPath: string, subPaths: string[]) => {
    const paths: string[] = []
    for (let p = 0; p < subPaths.length; p++) {
        const subPath = subPaths[p];
        const subPathSegments = subPath.split(SEP);
        let start = rootPath
        for (let i = 0; i < subPathSegments.length; i++) {
            start += `${SEP}${subPathSegments[i]}`
            paths.push(start)
        }

    }
    return Array.from(new Set(paths))
}

export const createDirs = async (rootPath: string, projectStruct: struct) => {
    const subPaths = getDirPaths(projectStruct);
    const recursivePaths = getRecursivePaths(rootPath, subPaths)
    for (let i = 0; i < recursivePaths.length; i++) {
        const currentPath = recursivePaths[i];
        try {
            await filesystem.readDirectory(currentPath)
        }
        catch (err) {
            const err01 = err as { code: string}
            if (err01.code !== 'NE_FS_NOPATHE'){
                console.error(err)
            }
            try {
                await filesystem.createDirectory(currentPath)
            }
            catch (error) {
                console.error(error)
                continue;
            }
        }
    }
}