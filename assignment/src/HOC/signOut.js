import React from 'react';

export const SignOut = (data) => {
    if (data.success === false) {
        let msg = data.response.msg;
        if (msg === "signout") {
            window.location.href = '/digital-gold'
        }
        console.log(msg, 'signout')
    }
}
