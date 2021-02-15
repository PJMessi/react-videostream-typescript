import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useVideoContext } from "../../contexts/video.context";
import { fetchVideo } from '../../actions/video.action';
import { formatVideoSize } from '../../helpers/video.helper';

const Video = () => {

    const { videoId }: { videoId: string } = useParams();

    const { videoState, videoDispatch } = useVideoContext();

    const [video, setVideo] = useState(videoState.paginatedVideos?.rows.find(video => {
        return parseInt(videoId) === video.id;
    }))

    useEffect(() => {
        if (!video) {
            fetchVideo(videoDispatch, videoId)
            .then(responseVideo => {
                setVideo(responseVideo)
            })
        }
    }, [])

    if (!video) {
        return <p>Video not fetched.</p>
    }

    const videoStreamAPI = `http://localhost:5000/videos/${videoId}/stream`

    return <>
        <h3>{video.name}</h3>
        <span>Size: {formatVideoSize(video.size)}</span> <br/>
        <video id="videoPlayer" width="650" controls muted={true} autoPlay={true}>
            <source src={videoStreamAPI} type="video/mp4" />
        </video>

    </>
}

export default Video;