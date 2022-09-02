import { useEffect, useState } from "react";
import { Movie } from "./Movie";
import { INTIAL_MOVIE_LIST } from "./App";
import { API } from "./global"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export function MovieList() {

   const [movieList, setMovieList] = useState([]);

   const getMovies = () => {
    fetch(`${API}/movies`, {
      method: "GET",
    }) 
  .then(res => res.json())
  .then((mvs) => setMovieList(mvs))
  }
   

  useEffect(() => getMovies(), [])



  return (
    <div>
      
      <div className="movie-list">
        {movieList.map((mv, index) => (
          <Movie 
          key={mv.id} 
          movie={mv} 
          id={mv.id} 
          deleteButton ={
            <IconButton 
            onClick={() => {
              fetch(`${API}/movies/${mv.id}`, {
                method: "DELETE",
              }).then(() => getMovies());
            }}
            color="error"
            >
        <DeleteIcon />
      </IconButton>
          }
          />
        ))}

      </div>
    </div>


  );
}
