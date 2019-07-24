import { 
      EMAIL_CHANGED,
      PASSWORD_CHANGED,
      LOGIN_USER_SUCCESS,
      REGISTER_EMAIL_CHANGED,
      REGISTER_PASSWORD_CHANGED,
      CONFIRM_PASSWORD_CHANGED,
      IGN_CHANGED,
      //DATE_CHANGED,
      PHONE_CHANGED,
      LOGIN_USER_FAIL,
      LOGIN_USER,
      RECOVER_PASSWORD,
      SENT_EMAIL_FAIL,
      SENT_EMAIL_SUCCESS,
      NAME_CHANGED,
      GET_USER,
      NEW_NAME_CHANGED,
      NEW_IGN_CHANGED,
      NEW_PHONE_CHANGED,
      EDIT_SUCCESS,
      TRY_EDIT,
      GO_BACK,
      PASSWORD_OLD_CHNAGED,
      PASSWORD_NEW_CHNAGED,
      NEW_PASSWORD_CONFIRM_CHNAGED,
      EDIT_PASSWORD_SUCCESS,
      EDIT_PASSWORD_FAIL,
      EDIT_FAIL,
      WRONG_PASSWORDS,
      MESSAGE_SENT,
      MESSAGE_CHANGED,
      FETCH_REWARDS,
      PAYMENT_FETCH,
      RULES_FETCH,
      FIXTURE_FETCH,
      FETCH_TABLES,
      NEWS_FETCH,
      REGISTER_USER_FAIL,
      FETCH_LINKS,
      VIDEOS_FETCH,
      CONFIRM_EMAIL_CHANGED
    } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Toast } from 'native-base';
import * as emailjs from 'emailjs-com';
import _ from 'lodash';
import axios from 'axios';

const isPaid = false;
const rightPoints = 10;

const tournamentInfo = {
    houseNumber: 0,
    points: 0,
    goalsScored: 0,
    goalsConceded: 0,
    //goalsStand: tournamentInfo.goalsScored + '-' + tournamentInfo.goalsConceded,
  }
  
  const allTimeInfo = {
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    totalScoredGoals: 0,
    totalConcededGoals: 0,
    totalTrophies: 0
    //totalgoalsStand: allTimeInfo.totalScoredGoals + '-' + allTimeInfo.totalConcededGoals,
  }
   
export const oldPasswordChanged = (text) => {
    return {
        type: PASSWORD_OLD_CHNAGED,
        payload: text
    };
};

export const newPasswordChanged = (text) => {
    return {
        type: PASSWORD_NEW_CHNAGED,
        payload: text
    };
};

export const confirmNewPasswordChanged = (text) => {
    return {
        type: NEW_PASSWORD_CONFIRM_CHNAGED,
        payload: text
    };
};
  
export const newNameChanged = (text) => {
    return {
        type: NEW_NAME_CHANGED,
        payload: text
    };
};

export const newIGNChanged = (text) => {
    return {
        type: NEW_IGN_CHANGED,
        payload: text
    };
};

export const newPhoneChanged = (text) => {
    return {
        type: NEW_PHONE_CHANGED,
        payload: text
    };
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const confirmEmailChanged = (text) => {
    return {
        type: CONFIRM_EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const emailRFChanged = (text) => {
    return {
        type: REGISTER_EMAIL_CHANGED,
        payload: text
    };
};

export const passwordRFChanged = (text) => {
    return {
        type: REGISTER_PASSWORD_CHANGED,
        payload: text
    };
};

export const confirmPasswordRFChanged = (text) => {
    return {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};


export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    };
};

export const ignChanged = (text) => {
    return {
        type: IGN_CHANGED,
        payload: text
    };
};

// export const dateChanged = (text) => {
//     return {
//         type: DATE_CHANGED,
//         payload: text
//     };
// };

export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    };
};

export const messageChanged = (text) => {
    return {
        type: MESSAGE_CHANGED,
        payload: text
    };
};


export const emailPassRecoveyChanged = (text) => {
    return {
        type: RECOVER_PASSWORD,
        payload: text
    };
};

export const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.tabber({type: 'reset'});
    Actions['lobby']();
};


export const sentEmailSuccess = (dispatch) => {
    dispatch({
        type: SENT_EMAIL_SUCCESS,
    });
    Actions.loginpage();
};

export const sentEmailFail = (dispatch) => {
    dispatch({
        type: SENT_EMAIL_FAIL
    });
};
export const loginUserFail = (dispatch, email) => {
    dispatch({
        type: LOGIN_USER_FAIL, payload: email
    });
    Actions.loginpage();
};
export const registerUserFail = (dispatch) => {
    dispatch({
        type: REGISTER_USER_FAIL
    });
    //Actions.registerpage();
};

export const fetchRulesAction = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/416e9e87d0d49d993c0a')
    .then(respone => { 
        dispatch({type: RULES_FETCH, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}

export const fetchPaymentMethods = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/d197141f8bfab34f3e39')
    .then(respone => { 
        dispatch({type: PAYMENT_FETCH, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}

export const fetchFixturesAction = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/4d890ebfbed8ae5b6032')
    .then(respone => { 
        console.log(respone.data)
        dispatch({type: FIXTURE_FETCH, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            });
        }
    );
    }
}

export const fetchVideosAction = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/8dd9d23777dd23df2e69')
    .then(respone => { 
        dispatch({type: VIDEOS_FETCH, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}


export const fetchNewsAction = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/9f9c80219815cef9657f')
    .then(respone => { 
        dispatch({type: NEWS_FETCH, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}

export const fetchFooterLinks = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/cb7bde2d6cbc6510fb55')
    .then(respone => { 
        dispatch({type: FETCH_LINKS, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}
export const fetchTablesAction = () => {
    return (dispatch) => {
    axios.get('https://api.npoint.io/b9b6ce93c8b32df95ed1')
    .then(respone => { 
        dispatch({type: FETCH_TABLES, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}

export const fetchRewardsAction = () => {
    return (dispatch) => {
    axios.get('https://rebrand.ly/hdemne')
    .then(respone => { 
        dispatch({type: FETCH_REWARDS, payload: respone.data})
    }).catch(
        (error) => {
            console.log(error);
            Toast.show({
                text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
        }
    );
    }
}

export const changePass = ({oldPassword, newPassword}) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
   currentUser.reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(
            currentUser.email, 
            oldPassword)).then(() => {
                currentUser.updatePassword(newPassword);
                dispatch({type: EDIT_PASSWORD_SUCCESS })
                Actions.tabber({type: 'reset'});
                Actions['lobby']();
                Toast.show({
                    text: 'סיסמתך שונתה בהצלחה! הנך מועבר ללובי',
                    type: "success",
                    duration: 3000,
                    buttonText: 'אחלה'
                });
            }).catch(() => {
                Toast.show({
                    text: 'סיסמה ישנה שגויה! אנא נסה שנית',
                    type: "danger",
                    duration: 3000,
                    buttonText: 'אחלה'
                });
                dispatch({type: EDIT_PASSWORD_FAIL });
            }
       )}
    }

export const forgotPasswordAction = (email) => {

    return (dispatch => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        sentEmailSuccess(dispatch);
        Toast.show({
            text: 'קישור לאיפוס סיסמא ממתין בתיבת המייל שלך',
            type: 'success',
            duration: 3000,
            buttonText: 'אחלה'
        });
      }).catch(() => {
        sentEmailFail(dispatch);
        Toast.show({
            text: 'אימייל לא קיים!',
            type: "danger",
            duration: 3000,
            buttonText: 'אחלה'
        });
      });
    });
  };

export const getUser = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
     firebase.database().ref(`/users/${currentUser.uid}/playerinformation`)
     .on('value', snapshot => {
     dispatch({ type: GET_USER, payload: snapshot.val()})
    });
};
}

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
        if (user){
        loginUserSuccess(dispatch, user)
        Toast.show({
            text: 'ברוך הבא!',
            type: "success",
            duration: 3000,
            buttonText: 'אחלה'
        });
    } else {
        Toast.show({
            text: 'אימייל או סיסמא לא נכונים!',
            type: "danger",
            duration: 3000,
            buttonText: 'אחלה'
        });
    }
    })
    .catch((error) => {
        loginUserFail(dispatch, email);
        console.log(error);
        Toast.show({
            text: 'אימייל או סיסמא לא נכונים!',
            type: "danger",
            duration: 3000,
            buttonText: 'אחלה'
        });
    });
    };
};

export const dispatchWrong = () => {
    return (dispatch) => {
        dispatch({ type: WRONG_PASSWORDS });
    }
}

export const updateProfileUser = ({fullname, ign, phone, birthdate, uid, tournamentInfo, allTimeInfo, email, isPaid, rightPoints}) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
    dispatch({type:TRY_EDIT});
    firebase.database().ref(`/users/${currentUser.uid}/playerinformation/${uid}`)
    .set({ fullname, ign, phone, birthdate, tournamentInfo, allTimeInfo, email, isPaid , rightPoints}).then(() => {
        dispatch({ type: EDIT_SUCCESS })
        Toast.show({
            text: 'כל השינויים נשמרו בהצלחה, הנך מועבר ללובי',
            type: "success",
            duration: 3000,
            buttonText: 'אחלה'
        });
        Actions.tabber({type: 'reset'});
        Actions['lobby']();
        }).catch((error) => {
            dispatch({type: EDIT_FAIL});
            Toast.show({
                text: 'אופס! משהו השתבש,, הנך מועבר ללובי',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            });
            Actions.tabber({type: 'reset'});
            Actions['lobby']();
            console.log(error)
    }
      )};
}

export const goBack = () => {
    return (dispatch) => {
        dispatch({type: GO_BACK});
        Actions.tabber({type: 'reset'});
        Actions['infoTab']();
    }
}


export const sendMessage = ({message, phone, fullname, email}) => {
    return (dispatch) => {
        var template_params = {
            "email_to": "osherd25@gmail.com",
            "phone": phone,
            "fullname": fullname,
            "email": email,
            "message": message
         }
         
       const service_id = "user_WS60PiZ31puIwxE8STd9h";
    const template_id = "new_message";        

        emailjs.send(service_id, template_id, template_params, service_id).then(function(response) {
   console.log('SUCCESS!', response.status, response.text);
   dispatch({type: MESSAGE_SENT});
   Toast.show({
    text: 'הודעתך נשלחה בהצלחה! הנך מועבר ללובי',
    type: "success",
    duration: 3000,
    buttonText: 'אחלה'
});
   Actions.tabber({type: 'reset'});
   Actions['lobby']();
}, function(err) {
    Toast.show({
        text: 'בעיות חיבור, בבקשה תבדוק את חיבור האינטרנט',
        type: "danger",
        duration: 3000,
        buttonText: 'אחלה'
    })
   console.log('FAILED...', err);
});;
 }
}

export const registerUser = ({email, password, fullname, ign, phone, birthdate}) => {
    return (dispatch) => {
     dispatch({ type: LOGIN_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            firebase.database().ref(`/users/${user.user.uid}/playerinformation`)
            .push({ fullname, ign, phone, birthdate, email, tournamentInfo, allTimeInfo, isPaid, rightPoints })

             const template_params = {
                 "email_to": "osherd25@gmail.com",
                 "phone": phone,
                 "fullname": fullname,
               "email": email,
               "ign": ign
            }
             
            const service_id = "user_WS60PiZ31puIwxE8STd9h";
            const template_id = "template_9bCdrs2h";
             emailjs.send(service_id, template_id, template_params, service_id).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(err) {
        console.log('FAILED...', err);
     });;

            loginUserSuccess(dispatch, user);
            Toast.show({
                text: '!ברוך הבא! היכנס לתיבת המייל שלך כדי לאשר את כתובת האימייל. 10 נקודות זכות נוספו על הרשמתך',
                type: "success",
                duration: 3000,
                buttonText: 'אחלה'
            })
            });        
        })
    .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
            Toast.show({
                text: 'האימייל שבחרת כבר קיים במערכת, נסה להתחבר או לאפס סיסמא',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            });
        }
        if (error.code == "auth/invalid-email") {
            Toast.show({
                text: 'אימייל שגוי! אנא נסה שנית',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            });
        }
        console.log(error);
        Toast.show({
            text: 'אופס! משהו השתבש, בבקשה נסה להיכנס למערכת',
            type: "danger",
            duration: 3000,
            buttonText: 'אחלה'
        });
        registerUserFail(dispatch);
    });
    };
};
