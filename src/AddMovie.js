import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global"
import { useFormik } from "formik";
import * as yup from "yup";
import { YouTube } from '@mui/icons-material';



// Validation - on Add movie & Edit movies
// name - required
// poster - min 4, required
// rating - 0 - 10, required
// summary - min 20 chars, required
// trailer - min 4, required

const movieValidationSchema = yup.object({
   name: yup
   .string()
   .required("Please fill the name?"),
   poster: yup
   .string()
   .min(4,"Need longer poster")
   .required("Please fill the poster?"),
   rating: yup
   .number()
   .min(0,"Need higher rating")
   .max(10, "Too much rating")
   .required("Please fill the rating?"),
   summary: yup
   .string()
   .min(20,"Need longer summary")
   .required("Please fill the summary?"),
   trailer: yup
   .string()
   .min(4,"Need longer trailer")
   .required("Please fill the trailer?"),
})


export function AddMovie() {


  // const [name, setName] = useState("");
  // const [poster, setPoster] = useState("");
  // const [rating, setRating] = useState("");
  // const [summary, setSummary] = useState("");
  // const [trailer, setTrailer] = useState("");

  const formik = useFormik({
    initialValues: { name: "", poster: "",  rating: "", summary: "",trailer: "" },
    validationSchema: movieValidationSchema,
    onSubmit: (newMovie) => {
      console.log("onSubmit", newMovie);
      createMovie(newMovie);
    }
  })


  const createMovie = (newMovie) => {
    
    console.log("createMovie", newMovie)
    fetch(`${API}/movies`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type":  "application/json",
      },
    }) 
  .then(res => res.json())
  .then(() => navigate("/movie"));

  }

  const navigate = useNavigate();


  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="add-movie-form">

        <TextField 
        id="name"
        name="name"
        error
        value={formik.values.name} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        helperText="Nice"
        label="Name" 
        variant="standard" />
        {formik.touched.name && formik.errors.name ? formik.errors.name  : ''}

        <TextField 
        id="poster"
        name="poster"
        error
        value={formik.values.poster} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        helperText="Nice"
        label="Poster" 
        variant="standard" />
        
        {formik.touched.poster && formik.errors.poster ? formik.errors.poster  : ''}


        <TextField 
        id="rating"
        name="rating"
        error
        value={formik.values.rating} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        helperText="Nice"
        label="Rating" 
        variant="standard" />
             {formik.touched.rating && formik.errors.rating ? formik.errors.rating  : ''}

        <TextField 
        id="summary"
        name="summary"
        error
        value={formik.values.summary} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        helperText="Nice"       
        label="Summary" 
        variant="standard" />
             {formik.touched.summary && formik.errors.summary ? formik.errors.summary  : ''}

        <TextField 
        id="trailer"
        name="trailer"
        error
        value={formik.values.trailer} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}  
        helperText="Nice" 
        label="Trailer" 
        variant="standard" />
      {formik.touched.trailer && formik.errors.trailer ? formik.errors.trailer  : ''}

        <Button 
        type="submit"
        variant="contained"
          //cope the MovieList and add newMovie to it
        onClick={createMovie}
            
        >Add Movie</Button>


      </form>
    </div>
  );

}



//Edit Movie -> PUT method 
// MovieDetails + AddMovie
//Edit Movie -> /movies/edit/:id -> 