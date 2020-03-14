import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from './../layout/Spinner'
import {getProfileById} from './../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
const Profile = ({
    match,
    profile : { loading,  profile},
    auth,
    getProfileById

}) => {
    // console.log(match)
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])
    return <Fragment>
        { profile ===null || loading ? (
            <Spinner />) :
            (<Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Back To Profiles
                </Link>
                {auth.isAuthenticated && loading===false && auth.user._id === profile.user._id &&
                (
                    <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
                )}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}></ProfileTop>
                    <ProfileAbout profile={profile}></ProfileAbout>
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                {profile.experience.map((val, index) => (
                                    <ProfileExperience key={index} experience={val}></ProfileExperience>
                                ))}
                            </Fragment>
                        ) : (<h4>No experience credentials</h4>)}
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                {profile.education.map((val, index) => (
                                    <ProfileEducation key={index} education={val}></ProfileEducation>
                                ))}
                            </Fragment>
                        ) : (<h4>No education credentials</h4>)}
                    </div>
                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername}></ProfileGithub>
                    )}
                </div>
            </Fragment>
        )}
    </Fragment>
}
const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}
Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {getProfileById} )(Profile)
