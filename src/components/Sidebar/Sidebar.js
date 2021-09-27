import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarOption from "../SidebarOption/SidebarOpiton";
import { useStateValue } from "../../StateProvider";
import db from "../../firebase";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";

import LoopIcon from "@mui/icons-material/Loop";

function Sidebar() {
  const [{ user }] = useStateValue();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (!channels.length)
      setLoading(<SidebarOption Icon={LoopIcon} title="Loading..." />);
    else setLoading("");
  }, [channels]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
      </div>
      {/* <SidebarOption Icon={InsertCommentIcon} title="Threads" />
			<SidebarOption Icon={InboxIcon} title="Metions & reactions" />
			<SidebarOption Icon={DraftsIcon} title="Saved items" />
			<SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
			<SidebarOption Icon={FileCopyIcon} title="File browser" />
			<SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
			<SidebarOption Icon={AppsIcon} title="Apps" />

			<SidebarOption Icon={ExpandLessIcon} title="Show less" />
			<hr /> */}

      <SidebarOption Icon={BookmarkBorderIcon} title="HOME" />
      <hr />

      <SidebarOption Icon={AddIcon} addChannelOption title="Add channel" />

      {loading ||
        channels.map((channel) => (
          <SidebarOption
            key={channel.id}
            title={channel.name}
            id={channel.id}
          />
        ))}
    </div>
  );
}

export default Sidebar;
