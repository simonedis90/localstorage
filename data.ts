
/**
 * @param localstorageKey name for store data
 * @param cacheTime milliseconds of cache time
 * @param convert function to convert stored item
 */
export function LocalStorage<T2>(
    localstorageKey: string,
    cacheTime: number = 0,
    convert: (value: T2) => T2 = (value) => value) {
    
    return (target: any, propertyKey: string) => {
        const props: PropertyDescriptor = {};
            props.set = (value: any) => {
                if(value === null || value === undefined){
                    localStorage.removeItem(localstorageKey);
                    return;
                }
                localStorage.setItem(localstorageKey, JSON.stringify({
                    value,
                    cacheTime,
                    storedAt: new Date().getTime() + cacheTime
                }));
            }
            props.get = () => {
                const store = localStorage.getItem(localstorageKey);
                
                if(store){

                    try {
                        const parsed = JSON.parse(store);
                        const value = parsed.value;
                        const cacheTime_ = parsed.cacheTime;
                        if(cacheTime_ && parsed.storedAt < new Date().getTime()) {
                            localStorage.removeItem(localstorageKey);
                            return null;
                        }

                        return convert(value);

                    } catch (erro) {
                        localStorage.removeItem(localstorageKey);
                        return null;
                    }

                }
                return null;
            }

            Object.defineProperty(target, propertyKey, props);

        }
    
        
}

/**
 * @param sessionStorageKey name for store data
 * @param cacheTime milliseconds of cache time
 * @param convert function to convert stored item
 */
export function SessionStorage<T2>(
    sessionStorageKey: string,
    cacheTime: number = 0,
    convert: (value: T2) => T2 = (value) => value) {
    
    return (target: any, propertyKey: string) => {
        const props: PropertyDescriptor = {};
            props.set = (value: any) => {
                if(value === null || value === undefined){
                    sessionStorage.removeItem(sessionStorageKey);
                    return;
                }
                sessionStorage.setItem(sessionStorageKey, JSON.stringify({
                    value,
                    cacheTime,
                    storedAt: new Date().getTime() + cacheTime
                }));
            }
            props.get = () => {
                const store = sessionStorage.getItem(sessionStorageKey);
                
                if(store){

                    try {
                        const parsed = JSON.parse(store);
                        const value = parsed.value;
                        const cacheTime_ = parsed.cacheTime;
                        if(cacheTime_ && parsed.storedAt < new Date().getTime()) {
                            sessionStorage.removeItem(sessionStorageKey);
                            return null;
                        }

                        return convert(value);

                    } catch (erro) {
                        sessionStorage.removeItem(sessionStorageKey);
                        return null;
                    }

                }
                return null;
            }

            Object.defineProperty(target, propertyKey, props);
        }
    
        
}