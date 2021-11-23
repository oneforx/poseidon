import React, { useState } from "react";

const usePostId = (postId: number, customPost: Record<string, unknown>) => {
    const [state] = useState({
        loading: false,
        error: null,
        data: postId > -1 && postId !== null  ? null : customPost
    })
    return state
}

export default usePostId;