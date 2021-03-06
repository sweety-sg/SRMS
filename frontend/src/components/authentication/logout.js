import React from 'react';
import {render} from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

export const logout = () => async (dispatch) => {
    try {
        await axios.get('http://127.0.0.1:3000/srm/logout'
            
            // {headers: { "Content-Type": "application/json" ,  "X-CSRFToken": Cookies.get("csrftoken")},  params: {withCredentials : true}}
          ).then((response) => {
            console.log(response)
                Cookies.remove("teacher")
                window.location.reload();
            
          })
        // localStorage.removeItem('userInfo')
        // dispatch({ type: type.USER_LOGOUT })
    } catch (error) {
        console.log(error)
    }
}