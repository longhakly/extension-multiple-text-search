import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import SearchIcon from '@mui/icons-material/Search';

const Popup = () => {

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = () => {
    setIsSearching(true)

    setTimeout(() => {
      const searchWord = encodeURIComponent(searchText.trim());
      const searchUrl = `https://www.google.com/search?q=allintext:${searchWord}`;
      window.open(searchUrl, '_blank');
      setSearchText('');
    }, 1000);
  };


  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-40px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });


  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchText.trim() !== '') {
      handleSearch();
    }
  };


  return (
    <animated.div style={springProps} className="flex justify-center items-center p-8 rounded-br-[20px] rounded-bl-[20px] bg-stone-100">
      <div className="block w-[400px] rounded-bl-[20px]">
        <h1 className="text-xl font-bold mb-2">Let's Us Search For You 🚀</h1>
        <textarea
          type="text"
          placeholder="Your text to search here..."
          className="w-full h-[100px] border rounded-md p-2 outline-none mt-5"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="flex justify-end">
          <button
            className={`mt-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-black ${isSearching && 'cursor-not-allowed'}`}
            onClick={handleSearch}
            disabled={!searchText.trim() || isSearching}
          >
            {isSearching ? 'Searching...' : <SearchIcon sx={{ fontSize: 20 }} />}
          </button>
        </div>
      </div>
    </animated.div>
  );
};


export default Popup;
