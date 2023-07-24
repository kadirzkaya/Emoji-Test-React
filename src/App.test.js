import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './Header';
import EmojiResults from './EmojiResults';
import emojiList from "./emojiList.json";
import userEvent from "@testing-library/user-event";

describe('Pages test',()=>{
  let header, emojiText, searchInput, filterList, clickElementList;

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
  
  test('Header render test',()=>{
    render(<Header/>);

    header=screen.getByText(/Emoji Search/i);
    expect(header).toBeInTheDocument();
  });

  test('Emoji result row render',()=>{
    const scr=render(<EmojiResults emojiData={emojiList}/>);
    
    emojiText=scr.getAllByText(/Click to copy emoji/i);
    expect(emojiText.length).toEqual(1820);

  });

 
  test('Filter render',()=>{

    render(<App/>);

    const testValue='smile';
    searchInput=screen.getByPlaceholderText('searchInput');

    filterList=emojiList.filter((emoji)=>{
      emoji.keywords.toLocaleLowerCase().match(testValue) || emoji.title.toLocaleLowerCase().match(testValue)
    })
    userEvent.type(searchInput, testValue);

    filterList.map((item)=>{
      expect(screen.getByText(item.title)).toBeInTheDocument();
    })

  })

  test('Copy item',()=>{

    render(<App/>);
    const clickItem=screen.getByText("Grin");
    
    userEvent.click(clickItem);
 
    expect(clickItem.parentElement.getAttribute("data-clipboard-text")).toMatch("😁")
  })

})


