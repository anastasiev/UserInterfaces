import React, {Component, Fragment} from 'react';
import Styles from './styles.scss';


export default class SearchParamView extends Component{

    getSearchComponents(elements, icon, withRemove, handler, block) {
        return elements.map(e =>
            <span style={{display: block ? 'block' : 'inline'}} key={e}>
                {icon}<span className={Styles.Element}>{e}</span>
                {withRemove && <span onClick={event => { handler(event, e) }} className={Styles.Remove}><i className="material-icons">delete_forever</i></span>}
            </span>
        )
    }
    render () {
        const { search, withRemove, handler, block }  = this.props;
        const tags = search.get('tags');
        const locations = search.get('locations');
        const text = search.get('text');

        const actionIcon = typeof tags !== 'undefined' ? <i style={{color: '#5D4037'}} className={`${Styles.Tag} material-icons`}>#</i> :
                         typeof locations !== 'undefined' ? <i style={{color: '#3897f0'}} className="material-icons">location_on</i> :
                         <i style={{color: '#FF5722'}} className="material-icons">perm_identity</i>;
        const searchComponents = typeof tags !== 'undefined' ? this.getSearchComponents(tags, actionIcon, withRemove, handler, block) :
                                 typeof locations !== 'undefined' ? this.getSearchComponents(locations, actionIcon, withRemove, handler, block) :
                                     this.getSearchComponents([text], actionIcon, withRemove, handler, block);

        return (
            <div className={Styles.ParamView}> { searchComponents } </div>
        )
    }

}