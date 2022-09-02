import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global"

export function AddMovie() {


  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [trailer, setTrailer] = useState("");

  const navigate = useNavigate();


  return (
    <div>
      <div className="add-movie-form">

        <TextField onChange={(e) => setName(e.target.value)} label="Name" variant="standard" />
        <TextField onChange={(e) => setPoster(e.target.value)} label="Poster" variant="standard" />
        <TextField onChange={(e) => setRating(e.target.value)} label="Rating" variant="standard" />
        <TextField onChange={(e) => setSummary(e.target.value)} label="Summary" variant="standard" />
        <TextField onChange={(e) => setTrailer(e.target.value)} label="Trailer" variant="standard" />

        <Button variant="contained"
          //cope the MovieList and add newMovie to it
          onClick={() => {
            const newMovie = {
              name: name,
              poster: poster,
              rating: rating,
              summary: summary,
              trailer: trailer,
            };

            // setMovieList([...movieList, newMovie]);
            // 1. method - POST
            // 2. body - data - JSON
            // 3. Headers  -JSON 

            fetch(`${API}/movies`, {
              method: "POST",
              body: JSON.stringify(newMovie),
              headers: {
                "Content-Type":  "application/json",
              },
            }) 
          .then(res => res.json())
          .then(() => navigate("/movie"));
          //Currently post and navigate it immediately
          //When post is complete -> navigate /movies 
            
          }}
        >Add Movie</Button>


      </div>
    </div>
  );

}



//Edit Movie -> PUT method 
// MovieDetails + AddMovie
//Edit Movie -> /movies/edit/:id -> 