import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Styles from './styles.scss';
import TagsSearch from "../TagsSearch";
import LocationsSearch from "../LocationsSearch";
import UserRelationSearch from "../UserRelationSearch";
import {clearSearch} from "../../../../actions/search";
import {ActionType} from "../../../../helper/tasksprops";
import {disableCreateButton} from "../../../../actions/main";


class FollowAction extends Component{

    state = {
      active: 'tags'
    };

    handleClick = (e, searchType) => {
        if( this.state.active !== searchType ) {
            this.setState({
                active: searchType
            });
            this.props.clearSearch(ActionType.FOLLOW);
            this.props.disableCreateButton();
        }
    };

    render () {
        const { active } = this.state;
        return (
            <section className = {Styles.FollowAction}>
                    <Fragment>
                        <div onClick={e => this.handleClick(e, 'tags')} >
                            <TagsSearch active={active === 'tags'}/>
                        </div>
                        <div onClick={e => this.handleClick(e, 'locations')}>
                            <LocationsSearch active={active === 'locations'}/>
                        </div>
                        <div onClick={e => this.handleClick(e, 'relations')}>
                            <UserRelationSearch active={active === 'relations'}/>
                        </div>
                    </Fragment>

            </section>
        )
    }

}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        clearSearch,
        disableCreateButton
    }, dispatch);
export default connect(undefined, mapDispatchToProps)(FollowAction)