import React from 'react';
import './index.css';
import { useState } from 'react';
import songdata from './Data/searchpagedata.json';
import { indexOf } from 'lodash';
import Logo from './img/music-track.png';
import { Link } from 'react-router-dom';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';

export function FilterPage(props){
    const languageData = [...new Set(songdata.map((song) => song.language))];
    const genreData = [...new Set(songdata.map((song) => song.genre))];

    const [languages, setLanguages] = useState(languageData);
    const [genres, setGenres] = useState(genreData);

    const [mainFilter, setMainFilter] = useState({genre: [], language:[], artistGen:[]});

    function applyMainFilter(genre, language, artistGen, soundtrack){
        setMainFilter({genre: genre, language: language, artistGen: artistGen, soundtrack: soundtrack});
    }

    console.log(mainFilter);

    const colNames = ['Artist', 'Song', 'Genre', 'Language', 'Soundtrack'].map((name) => {
        return <th className='searchTable' key={name}>{name.toUpperCase()}</th>
    });

    const filteredGenreData = songdata.filter(song => {
        if(mainFilter.genre.length > 0){
            if(mainFilter.genre.includes(song.genre)){
                return song;
            }
        }else{
            return song;
        }
    });

    const filteredLanguageData = filteredGenreData.filter(song => {
        if(mainFilter.language.length > 0){
            if(mainFilter.language.includes(song.language)){
                return song;
            }
        }else{
            return song;
        }
    });

    const filteredArtistData = filteredLanguageData.filter(song => {
        if(mainFilter.artistGen.length > 0){
            if(mainFilter.artistGen.includes(song.gender)){
                return song;
            }
        }else{
            return song;
        }
    });

    const filteredSoundTrackData = filteredArtistData.filter(song => {
        if(mainFilter.soundtrack == song.soundtrack){
            return song;
        }
    })

    console.log(filteredGenreData);
    console.log(filteredLanguageData);
    console.log(filteredArtistData);
        

    const songs = filteredSoundTrackData.map((song) => {
        return <SongDataRow key={song.song} song ={song}/>
    })

    const formData = [{name: "genre", data: genres}, {name: "language", data: languages}]
    return(
           <><Nav/>
            <main className="flex-container-body">
                <Form data={formData} applyMainFilter={applyMainFilter}
                />
                <table className="searchTable">
                    <thead>
                    <tr>
                        {colNames}
                    </tr>
                    </thead>
                    <tbody className='searchTable'>
                        {songs}
                    </tbody>
                </table>
            </main>
            <Footer/></>
    )
}

function SongDataRow({song}){
    return(
        <tr>
            <td>{song.song}</td>
            <td>{song.artist}</td>
            <td>{song.genre.charAt(0).toUpperCase() + song.genre.slice(1) }</td>
            <td>{song.language.charAt(0).toUpperCase() + song.language.slice(1)}</td>
            <td>{song.soundtrack ? "Yes" : "No"}</td>
        </tr>
    )
}


function CheckBox(props){
    const choices = props.options.map((option) => {
        return <div className='choice' key={option}>
        <input type="checkbox" id={option} onChange={props.filterHandler}/>
        <label htmlFor={option}>{option.toUpperCase()}</label>
        </div>
    })

    return(
        <form className={'userinput ' + props.type}>
            <h1>{props.type.toUpperCase()}</h1>
            {choices}
        </form>
    )
}

function Form(props){

    const [genrefilterTags, setGenreFilterTags] = useState([]);
    const [languagefilterTags, setLanguageFilterTags] = useState([]);
    const [artistGenTags, setArtistGenTags] = useState([]);
    const [soundTrackSwitch, setSoundTrackSwitch] = useState(false);

    function soundTrackHandler(event){
        setSoundTrackSwitch(event.target.checked);
    }

    function genrefilterHandler(event){
        if (event.target.checked) {
            setGenreFilterTags([...genrefilterTags, event.target.id])
        } else {
            setGenreFilterTags(
                genrefilterTags.filter((genrefilterTag) => genrefilterTag !== event.target.id)
            )
        }
    }

    function languagefilterHandler(event){
        if (event.target.checked) {
            setLanguageFilterTags([...languagefilterTags, event.target.id])
        } else {
            setLanguageFilterTags(
                languagefilterTags.filter((languagefilterTag) => languagefilterTag !== event.target.id)
            )
        }
    }

    function artistGenHandler(event){
        if (event.target.checked) {
            setArtistGenTags([...artistGenTags, event.target.id])
        } else {
            setArtistGenTags(
                artistGenTags.filter((artistGenTag) => artistGenTag !== event.target.id)
            )
        }
    }

    const checkBoxes = props.data.map((data) => {
        return <CheckBox type={data.name} options={data.data} key={data.name} 
        filterHandler={data.name === "genre" ? genrefilterHandler : languagefilterHandler}/>
    })

    return(
        <><div className="flex-container inputs">
            {checkBoxes};
            <Options filterHandler={artistGenHandler} filterHandlerSwitch={soundTrackHandler}/>
        </div>
        <input className="btn filter" type="button" value="Filter Songs" 
        onClick={() => props.applyMainFilter(genrefilterTags, languagefilterTags, artistGenTags, soundTrackSwitch)}/>
        </>
    )
}

function Options(props){

    return(
        <div className="userinput">
            <div className="artistgen">
                <h1>Artist Gender</h1>
                <input type="checkbox" id="male" onChange={props.filterHandler}/>
                <label htmlFor="gen">Male</label>
                <input type="checkbox" id="female" onChange={props.filterHandler}/>
                <label htmlFor="gen">Female</label>
                <input type="checkbox" id="band" onChange={props.filterHandler}/>
                <label htmlFor="gen">Band</label>
            </div>
            <div className="soundtracks">
                <h1>Include Soundtracks</h1>
                <label className="switch">
                    <input type="checkbox" onChange={props.filterHandlerSwitch}/>
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    )
}