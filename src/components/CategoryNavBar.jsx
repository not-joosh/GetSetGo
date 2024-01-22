import '../stylesheets/CategoryBarsStyle.css';


export const CategoryNavBar = ({handleSelection, selection}) => {
    return (
        <ul>
            <li style = {{color: selection === 'all'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('all')}}>ALL</li>
            <li style = {{color: selection === 'food'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('food')}}>FOOD</li>
            <li style = {{color: selection === 'fashion'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('fashion')}}>FASHION</li>
            <li style = {{color: selection === 'electronics'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('electronics')}}>ELECTRONICS</li>
            <li style = {{color: selection === 'personal'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('personal')}}>PERSONAL</li>
            <li style = {{color: selection === 'health'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('health')}}>HEALTH</li>
            <li style = {{color: selection === 'household'? '#52a2d0' : '#1e3f52'}} onClick = {() => {handleSelection('household')}}>HOUSEHOLD</li>
        </ul>
    );
};