import {Injectable, Inject} from "@angular/core";
import {DynamoDBService} from "../../../shared/aws/ddb.service";
// import {RegistrationUser} from "../../dyn-registration/dyn-registration.component";
import {environment} from "../../../../environments/environment";
// import {NewPasswordUser} from "../../dyn-newpassword/dyn-newpassword.component";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { observeOn } from 'rxjs/operator/observeOn';
/**
 * Created by Dean Selvey
 */


declare var AWSCognito: any;
declare var AWS: any;

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
    callback(): void;
    callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoUtil {


    public static _REGION = environment.region;

    public static _IDENTITY_POOL_ID = environment.identityPoolId;
    public static _USER_POOL_ID = environment.userPoolId;
    public static _CLIENT_ID = environment.clientId;

    public static _POOL_DATA = {
        UserPoolId: CognitoUtil._USER_POOL_ID,
        ClientId: CognitoUtil._CLIENT_ID
    };


    public static getAwsCognito(): any {
        return AWSCognito
    }

    getUserPool() {
        return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(CognitoUtil._POOL_DATA);
    }

    getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }


    getCognitoIdentity(): string {
        return AWS.config.credentials.identityId;
    }

    getAccessToken(callback: Callback): void {
        if (callback == null) {
            throw("CognitoUtil: callback in getAccessToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }

                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    getIdToken(callback: Callback): void {
        if (callback == null) {
            throw("CognitoUtil: callback in getIdToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    } else {
                        console.log("CognitoUtil: Got the id token, but the session isn't valid");
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    getRefreshToken(callback: Callback): void {
        if (callback == null) {
            throw("CognitoUtil: callback in getRefreshToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }

                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    refresh(): void {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log("CognitoUtil: Can't set the credentials:" + err);
            }

            else {
                if (session.isValid()) {
                    console.log("CognitoUtil: refreshed successfully");
                } else {
                    console.log("CognitoUtil: refreshed but session is still not valid");
                }
            }
        });
    }
}

@Injectable()
export class UserRegistrationService {

    constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {
        AWS.config.region = environment.region;
    }

    register(username: String, password: String) {

        return new Promise ((resolve, reject) => {
            console.log("UserRegistrationService: user is " + username);

            let attributeList = [];

            let dataEmail = {
                Name: 'email',
                Value: username
            };
            let dataNickname = {
                Name: 'nickname',
                Value: username
            };
            attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
            attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

            this.cognitoUtil.getUserPool().signUp(username, password, attributeList, null, function (err, result) {
                if (err) {
                    reject({ message: err.message, res: null });
                } else {
                    console.log("UserRegistrationService: registered user is " + result);
                    resolve({ message: null, res: result });
                }
            });
        });


    }

    confirmRegistration(username: string, confirmationCode: string) {

        return new Promise((resolve,reject) => {
            let userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
                if (err) {
                    reject({ message: err.message, res: null });
                } else {
                    resolve({ message: null, res: result });
                }
            });

        })

    }

    resendCode(username: string) {

        return new Promise((resolve,reject) => {
            let userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.resendConfirmationCode(function (err, result) {
                if (err) {
                    reject({ message: err.message, res: null });
                } else {
                    resolve({ message: null, res: result });
                }
            });
        })
    }

    // newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
    //   console.log(newPasswordUser);
    //   // Get these details and call
    //   //cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
    //   let authenticationData = {
    //       Username: newPasswordUser.username,
    //       Password: newPasswordUser.existingPassword,
    //   };
    //   let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    //   let userData = {
    //       Username: newPasswordUser.username,
    //       Pool: this.cognitoUtil.getUserPool()
    //   };

    //   console.log("UserLoginService: Params set...Authenticating the user");
    //   let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    //   console.log("UserLoginService: config is " + AWS.config);
    //   cognitoUser.authenticateUser(authenticationDetails, {
    //       newPasswordRequired: function(userAttributes, requiredAttributes) {
    //         // User was signed up by an admin and must provide new
    //         // password and required attributes, if any, to complete
    //         // authentication.

    //         // the api doesn't accept this field back
    //         delete userAttributes.email_verified;
    //         cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
    //           onSuccess: function (result) {
    //             callback.cognitoCallback(null, userAttributes);
    //           },
    //           onFailure: function (err) {
    //             callback.cognitoCallback(err, null);
    //           }
    //         });
    //       },
    //       onSuccess: function (result) {
    //         callback.cognitoCallback(null, result);
    //       },
    //       onFailure: function (err) {
    //         callback.cognitoCallback(err, null);
    //       }
    //     });
    // }
}

@Injectable()
export class UserLoginService {

    userAuthenticated: Subject<any>;
    currentUserEmail: string;

    constructor(public ddb: DynamoDBService, public cognitoUtil: CognitoUtil) {
        AWS.config.region = environment.region;

        this.userAuthenticated = new Subject()
        this.userAuthenticated.next(false);
    }

    isUserAuthenticated(): Subject<any> {
        return this.userAuthenticated;
    }

    login(username: string, password: string) {
        return new Promise((reject,resolve) => {
            this.authenticate(username, password, this)
        })
    }

    authenticate(username: string, password: string, callback: any) {

        return new Promise((resolve, reject) => {
            console.log("UserLoginService: starting the authentication")
            // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
            AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

            let authenticationData = {
                Username: username,
                Password: password,
            };
            let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

            let userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            console.log("UserLoginService: Params set...Authenticating the user");
            let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            console.log("UserLoginService: config is " + AWS.config);
            cognitoUser.authenticateUser(authenticationDetails, {
                newPasswordRequired: function(userAttributes, requiredAttributes) {
                    this.userAuthenticated = false;
                    reject({ message: `User needs to set password.`, res: null });
                },
                onSuccess: function (result) {

                    var logins = {}
                    logins['cognito-idp.' + CognitoUtil._REGION + '.amazonaws.com/' + CognitoUtil._USER_POOL_ID] = result.getIdToken().getJwtToken();

                    // Add the User's Id Token to the Cognito credentials login map.
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
                        Logins: logins
                    });

                    console.log("UserLoginService: set the AWS credentials - " + JSON.stringify(AWS.config.credentials));
                    console.log("UserLoginService: set the AWSCognito credentials - " + JSON.stringify(AWSCognito.config.credentials));
                    AWS.config.credentials.get(function (err) {
                        if (!err) {
                            callback.userAuthenticated.next(true);
                            // callback.userAuthenticated.next(true);          
                            resolve({ message: null, res: result });
                        } else {
                            callback.userAuthenticated.next(false);
                            // callback.userAuthenticated.next(false);          
                            reject({ message: err.message, res: null });
                        }
                    });

                },
                onFailure: function (err) {
                    callback.userAuthenticated.next(false);
                    reject({ message: err.message, res: null });
                },
            });
        });
    }

    forgotPassword(username: string, callback: CognitoCallback) {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function (result) {

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
        let userData = {
            Username: email,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function (result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    logout() {

        return new Promise((resolve, reject) => {
            console.log("UserLoginService: Logging out");
            this.ddb.writeLogEntry("logout");
            this.cognitoUtil.getCurrentUser().signOut();
            this.userAuthenticated.next(false);
            resolve();
        })
    }

    checkAuthStatus() :void {
        this.isAuthenticated(this)
    }

    isAuthenticated(callback: any) {
        if (callback == null)
            throw("UserLoginService: Callback in isAuthenticated() cannot be null");

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            this.currentUserEmail = cognitoUser.username;
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.userAuthenticated.next(false);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    callback.userAuthenticated.next(true);
                }
            });
        } else {
            console.log("UserLoginService: can't retrieve the current user");
            callback.userAuthenticated.next(false);
        }
    }

}

@Injectable()
export class UserParametersService {

    constructor(public cognitoUtil: CognitoUtil) {
    }

    getParameters(callback: Callback) {
        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err)
                    console.log("UserParametersService: Couldn't retrieve the user");
                else {
                    cognitoUser.getUserAttributes(function (err, result) {
                        if (err) {
                            console.log("UserParametersService: in getParameters: " + err);
                        } else {
                            callback.callbackWithParam(result);
                        }
                    });
                }

            });
        } else {
            callback.callbackWithParam(null);
        }


    }
}
