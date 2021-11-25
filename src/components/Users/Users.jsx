import React from "react";
import s from "./Users.module.css";


let Users = (props) => {

    if (props.users.length === 0) {
    props.setUsers([
        {
          id: 1,
          photoUrl:
            "https://www.meme-arsenal.com/memes/6c7be166c159f171e0709a1d6e57c967.jpg",
          followed: false,
          fullName: "Pavlik",
          status: "I am the durik",
          location: { cityName: "Moscow", countryName: "Russia" },
        },
        {
          id: 2,
          photoUrl:
            "https://www.meme-arsenal.com/memes/6c7be166c159f171e0709a1d6e57c967.jpg",
          followed: true,
          fullName: "Yana",
          status: "I am a boss",
          location: { cityName: "Minsk", countryName: "Belarus" },
        },
        {
          id: 3,
          photoUrl:
            "https://www.meme-arsenal.com/memes/6c7be166c159f171e0709a1d6e57c967.jpg",
          followed: false,
          fullName: "Dasha",
          status: "Gonna school",
          location: { cityName: "Kiev", countryName: "Ukraine" },
        },
      ])
    }
    return <div>
        {
        props.users.map(user => <div key={user.id}> 
        <span>
            <div>
                <img src={user.photoUrl} alt="#" className={s.userPhoto} />
            </div>
            <div>
                {user.followed 
                ? <button onClick={() => {props.unfollow(user.id)}}>Unfollow</button> 
                : <button onClick={() => {props.follow(user.id)}}>Follow</button>}
            </div>
        </span>
        <span>
        <span>
            <div>{user.fullName}</div>
            <div>{user.status}</div>
        </span>
        <span>
            <div>{user.location.cityName}</div>
            <div>{user.location.countryName}</div>
        </span>
        </span>
        </div>)
        }
    </div>
}

export default Users;