import React from "react";
import ReactDOM from "react-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import "./App.css";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {name: "crazy train", artist: "Ozzy", album: "Unknown", id: 1, uri: 'spotify:track:7ACxUo21jtTHzy7ZEV56vU'},
                {name: "Panic Station", artist: "Muse", album: "2nd Law", id: 2, uri: 'spotify:track:1tjHKKI0r82IB5KL29whHs'},
                {name: "First", artist: "Cold War Kids", album: "Cold War Kids", id: 3, uri: 'spotify:track:3omXshBamrREltcf24gYDC'},
            ],

            playlistName: "super crazy train",
            playlistTracks: [
                {name: "crazy train", artist: "Ozzy", album: "Unknown", id: 1, uri: 'spotify:track:7ACxUo21jtTHzy7ZEV56vU'},
            ]

        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            name={this.state.playlistName}
                            tracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
            </div>
        );
    }

    addTrack(track) {
        let duplicateTrack = false;
        this.state.playlistTracks.forEach(currentTrack => {
            if(currentTrack.id === track.id){
                duplicateTrack = true;
            }
        })
        if (!duplicateTrack) {
            this.setState(prevState => ({
                playlistTracks: [...prevState.playlistTracks, track]
            }))
        }

    }
    removeTrack(track) {
        const newList = [...this.state.playlistTracks];
        let remove_index = -1;
        for(let i = 0; i < newList.length; i++) {
            if (newList[i].id === track.id) {
                remove_index = i;
                break;
            }
        }
        if(remove_index !== -1) {
            newList.splice(remove_index, 1);
            this.setState({playlistTracks: newList});
        }
    }
    updatePlaylistName(name) {
        console.log("made it up!");
        this.setState({playlistName: name});
    }
    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
    }
    search(input) {
        console.log(input);
    }

}

export default App;

