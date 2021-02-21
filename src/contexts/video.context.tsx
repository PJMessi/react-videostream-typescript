import { createContext, useContext, useReducer } from "react";
import {
  initialVideoState,
  videoReducer,
} from "../reducers/video/video.reducer";
import { VideoActions } from "../reducers/video/videoReducerTypes";

const VideoContext = createContext<VideoContextType>({
  videoState: initialVideoState,
  videoDispatch: () => {},
});

export const useVideoContext = (): VideoContextType => {
  const context = useContext(VideoContext);
  // if (context === undefined) throw new Error('This component is not wrapped with Video Context.');
  return context;
};

export const VideoContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [state, dispatch] = useReducer(videoReducer, initialVideoState);

  return (
    <VideoContext.Provider
      value={{ videoState: state, videoDispatch: dispatch }}
    >
      {children}
    </VideoContext.Provider>
  );
};

type VideoContextType = {
  videoState: typeof initialVideoState;
  videoDispatch: (action: VideoActions) => void;
};
