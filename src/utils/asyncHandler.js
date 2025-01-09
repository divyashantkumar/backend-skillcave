
export const asyncHandler = (asyncCallbackFn) => {
    return async (req, res, next) => {
        try {
           await asyncCallbackFn(req, res, next);
        } catch (error) {
            console.error(error);
        }
    }
}
