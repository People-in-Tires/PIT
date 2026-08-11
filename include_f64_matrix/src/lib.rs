use std::str::FromStr;

use proc_macro::{Group, TokenStream, TokenTree};

#[proc_macro]
pub fn mk_array(input: TokenStream) -> TokenStream {
    let rv: TokenStream =
        TokenTree::Group(Group::new(proc_macro::Delimiter::Bracket, input)).into();
    rv
}
#[proc_macro]
pub fn include_f64_matrix(input: TokenStream) -> TokenStream {
    let file_loc: String = match input.clone().into_iter().collect::<Vec<TokenTree>>()[0].clone() {
        TokenTree::Literal(lit) => lit.to_string().trim_matches('\"').into(),
        token => panic!("expected string literal, got: {}", token),
    };

    let array_str: String = std::fs::read_to_string(file_loc).expect("can't find file");
    let mut literal_array: String = "[".into();
    for line in array_str.split("\n") {
        if line.is_empty() {
            continue;
        }
        literal_array += &("[".to_string() + &line.replace(" ", ",") + "],");
    }
    literal_array += "]";
    TokenStream::from_str(&literal_array).expect("wtf")
}
