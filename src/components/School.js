import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const School = () => {
    let { id } = useParams();
    const auth = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [initialLoadError, setInitialLoadError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState({ title: undefined, text: undefined });
    const hs = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getToken()}`,
    };
    const url = `http://localhost:8000/api/schools`;
  
    useEffect(() => {
      if (id)
        fetch(`${url}/${id}`)
          .then((res) => res.json())
          .then(
            (res) => {
              setPost(res);
              setIsLoaded(true);
            },
            (err) => {
              setInitialLoadError(err);
              setIsLoaded(true);
            }
          );
      else setIsLoaded(true);
    }, [id, url]);
  
    const createItem = (e) => {
      e.preventDefault();
      fetch(url, {
        method: "POST",
        headers: hs,
        body: JSON.stringify(post),
      }).then(
        (res) => {
          if (res.status === 200 || res.status === 201) {
            setStatus({ message: res.statusText });
          } else if (res.status === 401) {
            setStatus({ message: res.statusText });
          } else if (res.status === 422) {
            setStatus({ message: res.statusText });
          }
        },
        (err) => {
          setStatus(err);
        }
      );
    };
  
    const updateItem = (e) => {
      e.preventDefault();
      fetch(`${url}/${id}`, {
        method: "PUT",
        headers: hs,
        body: JSON.stringify(post),
      }).then(
        (res) => {
          if (res.status === 200) {
            setStatus({ message: res.statusText });
          } else if (res.status === 401) {
            setStatus({ message: res.statusText });
          } else if (res.status === 422) {
            setStatus({ message: res.statusText });
          }
        },
        (err) => {
          setStatus(err);
        }
      );
    };
  
    if (!isLoaded) {
      return <div>Kraunasi...</div>;
    } else if (initialLoadError) {
      return <div>Error: {initialLoadError.message}</div>;
    } else {
      return (
        <div className="d-flex aligns-items-center justify-content-center">
          <div className="card w-50">
            <div className="card-header">
              Ugdymo Istaigos {id ? `nr: ${id} edit` : `creation`} puslapis
            </div>
            <div className="card-body">
              <form onSubmit={(e) => (id ? updateItem(e) : createItem(e))}>
                <div className="my-2 text-danger">
                  {status === null ? "" : status.message}
                </div>
                <div className="form-group d-grid gap-2">
                  <input
                    className="form-control"
                    onChange={(e) => setPost({ ...post, name: e.target.value })}
                    onFocus={() => post.name ?? setPost({ ...post, name: "" })}
                    value={post.name ?? "New name"}
                  />
                  <input
                    className="form-control"
                    onChange={(e) => setPost({ ...post, address: e.target.value })}
                    onFocus={() => post.address ?? setPost({ ...post, address: "" })}
                    value={post.address ?? "New adress"}
                  />
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setPost({ ...post, code: e.target.value })
                    }
                    onFocus={() =>
                      post.code ?? setPost({ ...post, code: "" })
                    }
                    value={post.code ?? "New code"}
                  />
                  {/* <input
                    className="form-control"
                    onChange={(e) =>
                      setPost({ ...post, work_time: e.target.value })
                    }
                    onFocus={() =>
                      post.city ?? setPost({ ...post, work_time: "" })
                    }
                    value={post.work_time ?? "New work time"}
                  /> */}
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
};

export default School;