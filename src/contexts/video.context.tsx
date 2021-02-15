import { createContext, useContext, useReducer } from "react";
import { initialVideoState, VideoActions, videoReducer } from '../reducers/video.reducer';

const VideoContext = createContext<{
    videoState: typeof initialVideoState,
    videoDispatch: (action: VideoActions) => void
}>({
    videoState: initialVideoState,
    videoDispatch: () => {}
});

export const useVideoContext = () => {
    const context = useContext(VideoContext);
    // if (context === undefined) throw new Error('This component is not wrapped with Video Context.');
    return context;
}

export const VideoContextProvider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useReducer(videoReducer, initialVideoState);

    return <VideoContext.Provider value={{ videoState: state, videoDispatch: dispatch }}>
        {children}
    </VideoContext.Provider>
}