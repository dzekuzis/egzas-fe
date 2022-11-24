import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Schools() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const url = `http://localhost:8000/api/schools`;
  const auth = useContext(AuthContext);
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          setPosts(res);
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
  }, []);

  const deletePost = (id, e) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: hs,
    }).then(
      (res) => {
        if (res.status === 200) {
          const remaining = posts.filter((p) => id !== p.id);
          setPosts(remaining);
        } else if (res.status === 401) {
          setError({ message: res.statusText });
        }
      },
      (err) => {
        console.log(err);
        setError(err);
        setIsLoaded(true);
      }
    );
  };

  if (!isLoaded) {
    return <div>Kraunasi...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Ugdymo istaiga</th>
            <th>Adresas</th>
            <th>Kodas</th>
            
            <th>
              <span className="float-end mx-1">Veiksmai</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="col-lg-3">{post.name}</td>
              <td>{post.address}</td>
              <td>{post.code}</td>
              
              <td className="col-lg-2">
                {auth.getRole() === 2 ? (
                  <>
                    <button
                      onClick={(e) => navigate(`/schools/${post.id}`)}
                      className="plotis float-end btn btn-warning mx-1"
                    >
                      Redagavimas
                    </button>
                    <button
                      onClick={(e) => deletePost(post.id, e)}
                      className="plotis float-end btn btn-danger mx-1"
                    >
                      Istrinimas
                    </button>
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colspan="6"
              className="border border-3 border-start-0 border-bottom-0 border-end-0"
            >
              {auth.getRole() === 2 ? (
                <button
                  onClick={(e) => navigate(`/schools/create`)}
                  className="btn btn btn-success float-end mx-1"
                >
                  Prideti Nauja Ugdymo Istaiga
                </button>
              ) : (
                ""
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default Schools;