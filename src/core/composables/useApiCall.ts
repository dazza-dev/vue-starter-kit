import type { Ref } from 'vue';
import { getErrorMessage } from '../utils/error';
import { logger } from '../utils/logger';

/**
 * Wraps an async call: sets the loading flag, clears it in `finally`,
 * and logs the error before rethrowing it.
 */
export function useApiCall(loading: Ref<boolean>) {
    return async function apiCall<T>(fn: () => Promise<T>, errorContext = 'API request failed:'): Promise<T> {
        loading.value = true;
        try {
            return await fn();
        } catch (error) {
            logger.error(errorContext, getErrorMessage(error, 'Unknown error'));
            throw error;
        } finally {
            loading.value = false;
        }
    };
}
