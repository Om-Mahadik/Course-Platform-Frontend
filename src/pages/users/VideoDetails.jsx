import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { fetchVideoById, fetchVideosByModule } from "../../services/videoService";

import VideoPlayerSection from "../../components/users/courses/VideoPlayerSection";
import SidebarResourceGroup from "../../components/users/courses/SidebarResourceGroup";
import SidebarUpcomingGroup from "../../components/users/courses/SidebarUpcomingGroup";
import "./VideoDetails.css";

const VideoDetails = () => {
  // ✅ Extract both courseSlug and videoId from the URL
  const { slug: courseSlug, videoId } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [moduleVideos, setModuleVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideoData = async () => {
      try {
        setLoading(true);
        const auth = getAuth();

        // ✅ Wait for Firebase auth (important for refresh)
        const user = await new Promise((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((u) => {
            unsubscribe();
            resolve(u);
          });
        });

        if (!user) return;

        const token = await user.getIdToken();

        // 1️⃣ Fetch current video
        const videoData = await fetchVideoById(videoId, token);
        setVideo(videoData);

        // ✅ Normalize moduleId (object OR string)
        const moduleId =
          typeof videoData.moduleId === "object"
            ? videoData.moduleId._id
            : videoData.moduleId;

        // 2️⃣ Fetch all videos of same module
        const moduleVideosData = await fetchVideosByModule(moduleId, token);
        const sortedVideos = moduleVideosData.sort((a, b) => a.order - b.order);

        setModuleVideos(sortedVideos);

        const index = sortedVideos.findIndex(
          (v) => String(v._id) === String(videoId)
        );
        setCurrentVideoIndex(index >= 0 ? index : 0);
      } catch (err) {
        console.error("Failed to load video data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVideoData();
  }, [videoId]);

  // ---------------- STATES ----------------

  if (loading) return <p>Loading video...</p>;
  if (!video) return <p>Video not found</p>;

  // ---------------- DATA MAPPING ----------------

  const resourcesList = (video.resources || []).map((r, idx) => ({
    id: `res-${idx}`,
    name: r.title,
    link: r.link,
    type: r.type || "dl",
  }));

  const externalLinks = (video.directLinks || []).map((l, idx) => ({
    id: `link-${idx}`,
    name: l.title,
    link: l.link,
    type: "ext",
  }));

  const upcomingList = moduleVideos
    .slice(currentVideoIndex + 1)
    .map((v) => ({
      id: v._id,
      title: v.title,
      thumbnail: v.thumbnail,
    }));

  // ---------------- UI ----------------

  return (
    <div className="vd-main-container">
      {/* Module Header */}
      <header className="vd-module-header">
        <p>
          <strong>Module :</strong> {video.module?.title || "N/A"}
        </p>
      </header>

      <div className="vd-content-grid">
        {/* LEFT: Video Player */}
        <VideoPlayerSection
          title={video.title}
          duration={video.duration || "N/A"}
          description={video.description || "No description available."}
          videoUrl={video.videoUrl}
          thumbnail={video.thumbnail}
          videoId={video._id}
        />

        {/* RIGHT: Sidebar */}
        <aside className="vd-sidebar">
          <SidebarResourceGroup
            title="Resources"
            icon="📁"
            items={resourcesList}
          />

          <SidebarResourceGroup
            title="Direct Links"
            icon="🔗"
            items={externalLinks}
          />

          <SidebarUpcomingGroup
            title="Upcoming Videos"
            icon="📺"
            videos={upcomingList}
            courseSlug={courseSlug}
            duration={video.duration} // ✅ pass slug for correct navigation
          />
        </aside>
      </div>
    </div>
  );
};

export default VideoDetails;
