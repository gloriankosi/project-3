import * as React from "react";
import { useState, useRef } from "react";
import "../social.css";

export function SocialMedia(props) {
  const message = useRef(null);
  const [isShown, setshow] = useState(true);
  const info = props.info;
  const npost = props.post;
  const socket = props.socket;

  console.log(npost);
  const [post, updatepost] = useState(npost);
  let x = Object.keys(npost).length;

  //updatepost({...npost});
  console.log(npost);
  function post_function() {
    const nmessage = message.current.value;
    const new_post = { ...post };
    document.getElementById("output").value = "";
    if (info.familyName + " " + info.givenName in new_post) {
      new_post[info.familyName + " " + info.givenName].push(nmessage);
    } else {
      new_post[info.familyName + " " + info.givenName] = nmessage;
    }

    updatepost(new_post);
    socket.emit("post", [
      info.googleID,
      nmessage,
      info.familyName + " " + info.givenName,
      info.imageUrl,
    ]);

    setshow((prevShow) => !prevShow);
  }

  function foo() {
    return (
      <div>
        {Object.keys(post).map((key, i) => (
          <div>
            {post[key].map((item, index) => (
              <div style={{ margin: "3em 0" }}>
                <p>{key}</p>
                <div className="chatBox">
                  <pre>{item}</pre>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  function post_button() {
    setshow((prevShow) => !prevShow);
  }

  return (
    <div className="socialMediaWrap">
      <h1>Social Media Page </h1>

      <div className="socialBody">
        <div className="messageBody">
          <textarea
            ref={message}
            placeholder="Type message.."
            rows="6"
            cols="50"
            id="output"
          />
          <button
            class="button2"
            type="button"
            onClick={() => {
              post_function();
            }}
          >
            POST
          </button>
        </div>
        <div class="userpost">
          <div style={{ overflow: "auto", width: "100%" }}>{foo()}</div>
        </div>
      </div>
    </div>
  );
}
