import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVideoContext } from "../../contexts/video.context";
import { fetchVideos } from "../../actions/video.action";
import { PaginatedVideo, Video } from "../../reducers/video/videoReducerTypes";
import { formatVideoSize } from "../../helpers/video.helper";

const SingleVideo = ({ video }: { video: Video }) => {
  return (
    <li key={video.id} style={{ marginBottom: "1rem" }}>
      {video.name} <br />
      <span>Size: {formatVideoSize(video.size)}</span> <br />
      <Link to={{ pathname: `/videos/${video.id}` }}> View </Link>
    </li>
  );
};

const VideoList = ({
  paginatedVideos,
}: {
  paginatedVideos: PaginatedVideo;
}) => {
  if (paginatedVideos.count === 0) {
    return <p>Videos not found</p>;
  }

  return (
    <>
      <ul style={{ listStyle: "none" }}>
        {paginatedVideos.rows.map((video) => {
          return <SingleVideo key={video.id} video={video} />;
        })}
      </ul>
    </>
  );
};

const Dashboard = (): JSX.Element => {
  const { videoState, videoDispatch } = useVideoContext();

  useEffect(() => {
    fetchVideos(videoDispatch, videoState.videoPaginationFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Dashboard Page</h2>
      {videoState.paginatedVideos === null ? (
        <p>Video not fetched</p>
      ) : (
        <VideoList paginatedVideos={videoState.paginatedVideos} />
      )}
    </>
  );
};

export default Dashboard;
