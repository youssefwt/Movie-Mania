import { Search, ArrowDropDown } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./movieNavbar.scss";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

const Navbar = ({ setIsSearching }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleSearching = (e) => {
    if (e.target.value) {
      setIsSearching(e.target.value);
    } else {
      setIsSearching(e.target.value);
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <div className={isScrolled ? "movieNavbar scrolled" : "movieNavbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://raw.githubusercontent.com/youssefwt/Movie-Mania/main/logo.png"
            alt=""
          />
          <span className="title">Movie Mania</span>
          <NavLink to="/" className="link">
            <span>Home page</span>
          </NavLink>
          <NavLink to="/series" className="link">
            <span>Series</span>
          </NavLink>
          <NavLink to="/movies" className="link">
            <span>Movies</span>
          </NavLink>
          <NavLink to="/newsfeed" className="link">
            <span>newsFeed</span>
          </NavLink>

          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <div className="search_container">
            <Search className="icon" />
            <input
              type="text"
              placeholder="search"
              className="title_search"
              onChange={handleSearching}
            />
          </div>
          <span>KIDS</span>
          <NotificationsIcon className="icon" />
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAGQCAYAAABYs5LGAAAAAXNSR0IArs4c6QAAHkdJREFUeF7t3WmzI8WxBmCxGQ82Npjd7AzgAf7/v+ArAZjdZsfsDGBWR564faKpq6NuSSlyJudRhIOIO1JV15N1z9tdvd304osv/rrxIUCAAAECBK5rgZsE+nVdPxtPgAABAgTOBAS6iUCAAAECBBoICPQGRTQEAgQIECAg0M0BAgQIECDQQECgNyiiIRAgQIAAAYFuDhAgQIAAgQYCAr1BEQ2BAAECBAgIdHOAAAECBAg0EBDoDYpoCAQIECBAQKCbAwQIECBAoIGAQG9QREMgQIAAAQIC3RwgQIAAAQINBAR6gyIaAgECBAgQEOjmAAECBAgQaCAg0BsU0RAIECBAgIBANwcIECBAgEADAYHeoIiGQIAAAQIEBLo5QIAAAQIEGggI9AZFNAQCBAgQICDQzQECBAgQINBAQKA3KKIhECBAgAABgW4OECBAgACBBgICvUERDYEAAQIECAh0c4AAAQIECDQQEOgNimgIBAgQIEBAoJsDBAgQIECggYBAb1BEQyBAgAABAgLdHCBAgAABAg0EBHqDIhoCAQIECBAQ6OYAAQIECBBoICDQGxTREAgQIECAgEA3BwgQIECAQAMBgd6giIZAgAABAgQEujlAgAABAgQaCAj0BkU0BAIECBAgINDNAQIECBAg0EBAoDcooiEQIECAAAGBbg4QIECAAIEGAgK9QRENgQABAgQICHRzgAABAgQINBAQ6A2KaAgECBAgQECgmwMECBAgQKCBgEBvUERDIECAAAECAt0cIECAAAECDQQEeoMiGgIBAgQIEBDo5gABAgQIEGggINAbFNEQCBAgQICAQDcHCBAgQIBAAwGB3qCIhkCAAAECBAS6OUCAAAECBBoICPQGRTQEAgQIECAg0M0BAgQIECDQQECgNyiiIRAgQIAAAYFuDhAgQIAAgQYCAr1BEQ2BAAECBAgIdHOAAAECBAg0EBDoDYpoCAQIECBAQKCbAwQIECBAoIGAQG9QREMgQIAAAQIC3RwgQIAAAQINBAR6gyIaAgECBAgQEOjmAAECBAgQaCAg0BsU0RAIECBAgIBANwcIECBAgEADAYHeoIiGQIAAAQIEBLo5QIAAAQIEGggI9AZFNAQCBAgQICDQzQECBAgQINBAQKA3KKIhECBAgAABgW4OECBAgACBBgICvUERDYEAAQIECAh0c4AAAQIECDQQEOgNimgIBAgQIEBAoJsDBAgQIECggYBAb1BEQyBAgAABAgLdHCBAgAABAg0EBHqDIhoCAQIECBAQ6OYAAQIECBBoICDQGxTREAgQIECAgEA3BwgQIECAQAMBgd6giIZAgAABAgQEujlAgAABAgQaCAj0BkU0BAIECBAgINDNAQIECBAg0EBAoDcooiEQIECAAAGBbg4QIECAAIEGAgK9QRENgQABAgQICHRzgAABAgQINBAQ6A2KaAgECBAgQECgmwMECBAgQKCBgEBvUERDIECAAAECAt0cIECAAAECDQQEeoMiGgIBAgQIEBDo5gABAgQIEGggINAbFNEQCBAgQICAQDcHCBAgQIBAAwGB3qCIhkCAAAECBAS6OUCAAAECBBoICPQGRTQEAgQIECAg0M0BAgQIECDQQECgNyiiIRAgQIAAAYFuDhAgQIAAgQYCAr1BEQ2BAAECBAgIdHOAAAECBAg0EBDoDYpoCAQIECBAQKCbAwQIECBAoIGAQG9QREMgQIAAAQIC3RwgQIAAAQINBAR6gyIaAgECBAgQEOjmAAECBAgQaCAg0BsU0RAIECBAgIBANwcIECBAgEADAYHeoIiGQIAAAQIEBLo5QIAAAQIEGggI9AZFNAQCBAgQICDQzQECBAgQINBAQKA3KKIhECBAgAABgW4OECBAgACBBgICvUERDYEAAQIECAh0c4AAAQIECDQQEOgNimgIBAgQIEBAoJsDBAgQIECggYBAb1BEQyBAgAABAgLdHCBAgAABAg0EBHqDIhoCAQIECBAQ6OYAAQIECBBoICDQGxTREAgQIECAgEA3BwgQIECAQAMBgd6giIZAgAABAgQEujlAgAABAgQaCAj0BkU0BAIECBAgINDNAQIECBAg0EBAoDcooiEQIECAAAGBbg4QIECAAIEGAgK9QRENgQABAgQICHRzgAABAgQINBAQ6A2KaAgECBAgQECgmwMECBAgQKCBgEBvUERDIECAAAECAt0cIECAAAECDQQEeoMiGgIBAgQIEBDo5gABAgQIEGggINAbFNEQCBAgQICAQDcHCBAgQIBAAwGB3qCIhkCAAAECBAS6OUCAAAECBBoICPQGRTQEAgQIECAg0M0BAgQIECDQQECgNyiiIRAgQIAAAYFuDhAgQIAAgQYCAr1BEQ2BAAECBAgIdHOAAAECBAg0EBDoDYpoCAQIECBAQKCbAwQIECBAoIGAQG9QREMgQIAAAQIC3RwgQIAAAQINBAR6gyIaAgECBAgQEOjmAAECBAgQaCAg0BsU0RAIECBAgIBANwcIECBAgEADAYHeoIiGQIAAAQIEBLo5QIAAAQIEGggI9AZFNAQCBAgQICDQzQECBAgQINBAQKA3KKIhECBAgAABgW4OECBAgACBBgICvUERDYEAAQIECAh0c4AAAQIECDQQEOgNimgIBAgQIEBAoJsDBAgQIECggYBAb1BEQyBAgAABAgLdHCBAgAABAg0EBHqDIhoCAQIECBAQ6OYAAQIECBBoICDQGxTREAgQIECAgEA3BwgQIECAQAMBgd6giIZAgAABAgQEujlAgAABAgQaCAj0BkU0BAIECBAgINDNAQIECBAg0EBAoDcooiEQIECAAAGBbg5ckwK33HLL5sqVK5s//vGPe2/f999/v3nppZcWf3fPPfds7r333s2lS5c20d/0+fnnnzdXr17dfPLJJ5svvvhisZ3xC3/60582999//+bOO+/c3HrrrZubbrrp7Cu//PLL5r///e/ms88+O2s7+rmRPuHy5JNPbm6//fazYX/99debf/7zn3sRPPDAA5uoW7Rx8803n/32119/PbOM9sI1/rvv51RzYd/t8H0CxwgI9GP0/PZkAn/96183TzzxxFkg7vtZCvQ//OEPm8cee2zzl7/85Txst/URQfHVV19t/vWvf21++OGHVZvx97///SzM5zsI234Ywf7uu+8etMOwakOuwS8988wzZ+bTZ59Aj52BRx99dBP/3fWJnabYYQrbNTtMp5wL12AJbFJzAYHevMDX6/AiFB9++OHzo7B9xrEr0OOI//HHH9/8+c9/Xt3kN998s3nnnXc20e6uT+wkxJHedOS41MGPP/54FjwRQN0/saMTR9dzm7WBHisdYbt2tSZ2xGJlJWq2K9RPORe619P4rk0BgX5t1uWG36r4A37fffedOcQf6AjVtUfJEZTvvffeVsM46v/b3/72m2XwL7/88nypNlYGYhk+/jstlUf/Ebpvv/32hXWJbY0dkPmR+bfffrv5+OOPz8LltttuO2s3An++6vDdd99t3nzzzcWdhet5QoRl1DOOhuefNYEenk89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"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
