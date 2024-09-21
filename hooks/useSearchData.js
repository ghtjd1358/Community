import { useFetchSearchQuery } from "@/redux/features/searchSlice";
import { useEffect } from "react";

export const useSearchData = (debouncedQuery, searchType) => {
    const { data: results, error, isLoading } = useFetchSearchQuery(
        { query: debouncedQuery, type: searchType },
        { skip: debouncedQuery === '' }
    );

    useEffect(() => {
        if (isLoading) {
            console.log('Loading...');
        }
        if (error) {
            console.error('Error occurred:', error);
        }
        if (results) {
            console.log(results);
        }
    }, [results, error, isLoading]);

    return { results, error, isLoading };
};
