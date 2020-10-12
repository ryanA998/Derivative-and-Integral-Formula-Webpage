//Recreaton of a Derivative Formula Sheet with Javascript 
//Author: Ryan Arendt
//Last Edited: 10/10/2020 
//Version: Final


class DxCell{

    constructor(number, parent_id, class_id, div_id,is_fract, num_html, den_html){

        this.number = number; 
        this.class_id = class_id;
        this.div_id = div_id;
        this.is_fract = is_fract; 
        this.num_html = num_html;
        this.den_html = den_html; 
        this.parent_id = parent_id;

        this.cell_box = this.gen_cell_box();
        document.getElementById(this.parent_id).appendChild(this.cell_box);
        this.gen_cell_content();

    }

    gen_cell_box(){

        let cell = document.createElement('div');
        cell.setAttribute('id', this.div_id); 
        cell.setAttribute('class', this.class_id);

        return cell;

    }

    gen_cell_content(){

        if(this.is_fract == true){
            
            let num = document.createElement('div'); 
            num.setAttribute('class', 'numerator');
            num.innerHTML = this.num_html;

            let fract_bar = document.createElement('div');
            fract_bar.setAttribute('class', 'fract_bar');

            let den = document.createElement('div');
            den.setAttribute('class', 'denominator');
            den.innerHTML = this.den_html;

            this.set_fract_syle();
 
            document.getElementById(this.div_id).appendChild(num);
            document.getElementById(this.div_id).appendChild(fract_bar);
            document.getElementById(this.div_id).appendChild(den);

        }

        else{
            this.cell_box.innerHTML = this.num_html;
            document.getElementById(this.div_id).style.float = "left";
            if(this.class_id == "dx_form"){
                document.getElementById(this.div_id).style.top = "30%";
            }
            else if(this.class_id =="dx_rule"){
                document.getElementById(this.div_id).style.top = "30%";
            }
        }
    }

    set_fract_syle(){

        let fract_len = this.set_fract_length();
        document.getElementById(this.div_id).style.width = fract_len;
        document.getElementById(this.div_id).style.float = "left";
        document.getElementById(this.div_id).style.textAlign= "center";
    }


    set_fract_length(){

        let max_length;
        let fract_length; 

        if(this.num_html.length >= this.den_html.length){
            max_length = this.num_html.length;
        }
        else{
            max_length = this.den_html.length;
        }

        if(max_length < 10){
            fract_length = 30;
        }
        else{
            fract_length = 80;
        }
        return fract_length.toString()+"px";
    }
}

class FormulaBox{

    constructor(n, form_class, form_id,is_form_fract, form_num, form_den, is_rule_fract,rule_num, rule_den){

        this.n = n; 
        this.form_class = form_class;
        this.form_id = form_id;
        this.is_form_fract = is_form_fract;
        this.form_num = form_num;
        this.form_den = form_den;
        this.is_rule_fract = is_rule_fract;
        this.rule_num = rule_num;
        this.rule_den = rule_den; 

        this.n_str = n.toString();
        this.parent_id = "dx_table";
  
        this.eq_box = this.gen_eq_box(this.form_class, this.form_id);
        document.getElementById(this.parent_id).appendChild(this.eq_box);

        this.box = this.gen_box();

    }
    gen_eq_box(box_class, box_id){

        let eq_box = document.createElement('div');
        eq_box.setAttribute("id", box_id);
        eq_box.setAttribute("class", box_class);

        return eq_box;

    }
    gen_box(){
        if(this.form_class == "dx_box"){
            this.gen_dx_box();
        }
        else if(this.form_class =="int_box"){
            this.gen_int_box();
        }
    }

    gen_dx_box(){
                                
        let num_box = new DxCell(this.n,this.form_id, "dx_number", "number_"+this.n_str, false, this.n_str+":", "");
        let sign_box = new DxCell(this.n, this.form_id, "dx_sign", "sign_"+this.n_str, true, "d", "dx");
        let open_par_box = new DxCell(this.n, this.form_id,"open_paren", "open_p_"+this.n_str, false, "[", "");
        let dx_form_box = new DxCell(this.n, this.form_id, "dx_form","form_"+this.n_str,this.is_form_fract, this.form_num, this.form_den);
        let close_par_box = new DxCell(this.n, this.form_id,"close_paren", "close_p_"+this.n_str, false, "]", "");
        let equals_box = new DxCell(this.n, this.form_id,"equals","eq_"+this.n_str,false, "=", "");
        let rule_box = new DxCell(this.n, this.form_id, "dx_rule","rule_"+this.n_str,this.is_rule_fract, this.rule_num, this.rule_den);
    }

    gen_int_box(){
        
        let num_box = new DxCell(this.n,this.form_id, "dx_number", "int_number_"+this.n_str, false, this.n_str+":", "");
        let int_sign_box = new DxCell(this.n, this.form_id, "int_sign", "int_sign_"+this.n_str, false, "&#8747", "");
        let int_form_box = new DxCell(this.n, this.form_id, "int_form", "int_form"+this.n_st, false,this.form_num,this.form_den);
        let int_equals_box = new DxCell(this.n, this.form_id,"int_equals","int_eq_"+this.n_str,false, "=", "");
        let int_rule_box = new DxCell(this.n, this.form_id, "int_rule","int_rule_"+this.n_str,this.is_rule_fract, this.rule_num, this.rule_den);
    }
}


let dx_data = [[false,"cu","",false,"cu<sup>'</sup>",""],[false,"u+-v","" ,false,"u<sup>'</sup>+-v<sup>'</sup>", ""],[false,"uv", "",false,"uv<sup>'</sup>+vu<sup>'</sup>",""],
    [true,"u","v", true,"u<sup>'</sup>-uv<sup>'</sup>","v<sup>2</sup>"],[false,"c","", false,"0",""],[false,"u<sup>n</sup>","",false, "nu<sup>n-1</sup>u<sup>'</sup>",""],[false,"x","",false, "1",""],
    [false,"|u|","", true,"u u<sup>'</sup>","|u|"],[false,"ln u", "", true, "u<sup>'<sup>", "u"],[false,"e<sup>u</sup>","", false, "e<sup>u</sup> u<sup>'</sup>",""],[false,"log<sub>a</sub>u", "", true, "u<sup>'</sup>","(ln a)u"],
    [false,"a<sup>u</sup>", "", false, "(ln a)a<sup>u</sup>u<sup>'</sup>", ""],[false,"sin u", "", false, "(cos u)u<sup>'</sup>",""],[false,"cos u", "", false, "-(sin u)u<sup>'</sup>",""],[false,"tan u", "",  false, "(sec<sup>2</sup>u)u<sup>'</sup>",""],[false,"cot u", "",  false, "-(csc<sup>2</sup>u)u<sup>'</sup>",""],
    [false,"sec u","", false, "(sec u tan u)u<sup>'</sup>",""],[false,"csc u", "", false, "-(csc u cot u)u<sup>'</sup>",""],[false,"arcsin u", "", true, "u<sup>'</sup>","(1-u<sup>2</sup>)<sup>1/2</sup>"],
    [false, "arccos u", "", true, "-u<sup>'</sup>","(1-u<sup>2</sup>)<sup>1/2</sup>"],[false, "arctan u", "",  true, "u<sup>'</sup>","1+u<sup>2</sup>"],[false, "arccot u", "", true, "-u<sup>'</sup>","1+u<sup>2</sup>"],
    [false, "arccos u", "",  true,  "u<sup>'</sup>","|u|(u<sup>2</sup>-1)<sup>1/2</sup>"],[false, "arccsc u", "", true, "-u<sup>'</sup>","|u|(u<sup>2</sup>-1)<sup>1/2</sup>"],[false, "sinh u", "",  false, "(cosh u)u<sup>'</sup>",""],
    [false,"cosh u","", false, "(sinh u)u<sup>'</sup>",""],[false,"tanh u","", false, "(sech<sup>2</sup>)u<sup>'</sup>",""],[false,"coth u","", false, "-(csch<sup>2</sup>u<sup>'</sup>",""],
    [false,"sech u","", false, "-(sech u tanh u)u<sup>'</sup>",""],[false,"csch u", "",false, "-(csch u coth u)u<sup>'</sup>",""],[false,"sinh<sup>-1</sup>u","", true, "u<sup>'</sup>","(u<sup>2</sup>+1)<sup>1/2</sup>"],
    [false,"cosh<sup>-1</sup>u","", true, "u<sup>'</sup","(u<sup>2</sup>-1)<sup>1/2</sup>"],[false,"tanh<sup>-1</sup>u","", true, "u<sup>'</sup","1-u<sup>2</sup>"],[false,"coth<sup>-1</sup>u","", true, "u<sup>'</sup","1-u<sup>2</sup>"],
    [false,"sech<sup>-1</sup>u","", true, "-u<sup>'</sup","u(1-u<sup>2</sup>)<sup>1/2</sup>"],[false,"csch<sup>-1</sup>u","", true, "-u<sup>'</sup","|u|(1+u<sup>2</sup>)<sup>1/2</sup>"],
];

let ig_data = [
    [false, "du","",false,"u+C",""],[false, "e<sup>u</sup>du","",false,"e<sup>u</sup> + C",""],[false, "cos u du", "",false,"sin u + C",""],
    [false, "sin u du","", false, "-cos u + C", ""],[false, "tan  u du", " ", false, "-ln|cos u| + C", ""],[false, "cot u du", "", false, "ln|sin u| +c]",""],
    [false, "sec u du", "", false, "ln|sec u + tan u| + C", ""],[false, "csc u du", "", false, "-ln|csc u + cot u| + C", ""],
    [false, "sec<sup>2</sup>", "",false, "tan u + C", ""],[false, "csc<sup>2</sup>", "", false, "-cot u +C", ""],
];

function set_dx_formulas(){

    for(let i=0; i<dx_data.length; i++){
        let num = i + 1; 
        let cur = new FormulaBox(num, "dx_box", "box_"+num.toString(), dx_data[i][0],dx_data[i][1],dx_data[i][2],dx_data[i][3],dx_data[i][4],dx_data[i][5]);
    }
}

function set_int_formulas(){

    for(let i=0; i<ig_data.length; i++){
        let num = i+1;
        let cur_ig = new FormulaBox(num, "int_box", "int_"+num.toString(),ig_data[i][0],ig_data[i][1],ig_data[i][2],ig_data[i][3],ig_data[i][4],ig_data[i][5])
    }
}


function set_box_label(label_text){
    let dx_label = document.createElement('div');
    dx_label.setAttribute('class', "formula_label");
    dx_label.innerHTML = label_text;
    document.getElementById('dx_table').appendChild(dx_label);
}

function main(){
    set_box_label("Basic Integration Formulas");
    set_dx_formulas();
    set_box_label("Basic Differentiation Rules");
    set_int_formulas();
}


document.onload = main();






