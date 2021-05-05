import React, { useState, useEffect } from 'react';

import Layout from "../components/layout/Layout"

// class About extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { values: [] };
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     createUI(){
//        return this.state.values.map((el, i) => 
//            <div key={i}>
//               <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
//               <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
//            </div>          
//        )
//     }
  
//     handleChange(i, event) {
//        let values = [...this.state.values];
//        values[i] = event.target.value;
//        this.setState({ values });
//     }
    
//     addClick(){
//       this.setState(prevState => ({ values: [...prevState.values, '']}))
//     }
    
//     removeClick(i){
//        let values = [...this.state.values];
//        values.splice(i,1);
//        this.setState({ values });
//     }
  
//     handleSubmit(event) {
//       alert('A name was submitted: ' + this.state.values.join(', '));
//       event.preventDefault();
//     }
  
//     render() {

//         return (
//             <Layout className="about">
//                 <form onSubmit={this.handleSubmit}>     
//                     <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
//                     <input type="submit" value="Submit" />
//                     {this.createUI()} 
//                 </form>  
//             </Layout>
//         )

//     }
//   }

function About() {

    const [values, setValues] = useState({ val: []});

    function createInputs() {
        return values.val.map((el, i) =>
            <div key={i}>
            <input type="text" value={el||''} onChange={handleChange.bind(i)} />
            <input type='button' value='remove' onClick={removeClick.bind(i)} />
            </div>
        );
    }

    function handleChange(event) {
        let vals = [...values.val];
        vals[this] = event.target.value;
        setValues({ val: vals });
    }

    const addClick = () => {
        setValues({ val: [...values.val, '']})
    }

    const removeClick = () => {
        let vals = [...values.val];
        vals.splice(this,1);
        setValues({ val: vals });
    }

    const handleSubmit = event => {
        alert('A name was submitted: ' + values.val.join(', '));
        event.preventDefault();
    }


    return (
        <Layout className="about">
            <form onSubmit={handleSubmit}>
                {/* <input type='button' value='add more' onClick={addClick} />
                <input type="submit" value="Submit" /> */}
                {createInputs()}
            </form>    
        </Layout>
    )
}

export default About
