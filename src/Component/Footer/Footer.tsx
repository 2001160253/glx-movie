import React from "react";
// import { Link, useNavigate  } from "react-router-dom";
import './Footer.scss'
import { FaFacebook, FaYoutube, FaInstagram, FaAppleAlt, FaAppStoreIos } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="MainFooter d-flex justify-content-center">
        <div className="MainSize w-100">
          <div className="Box d-flex justify-content-between">
            <div className="BoxCard">
              <h3 className="titleFooter">GIỚI THIỆU</h3>
              <ul>
                <li><a href='/'>⪼ VỀ CHÚNG TÔI</a></li>
                <li><a href='/'>⪼ THOẢ THUẬN NGƯỜI DÙNG </a></li>
                <li><a href='/'>⪼ QUY CHẾ HOẠT ĐỘNG</a></li>
                <li><a href='/'>⪼ CHÍNH SÁCH BẢO MẬT </a></li>
              </ul>
            </div>
            <div className="BoxCard">
              <h3 className="titleFooter">GÓC ĐIỆN ẢNH</h3>
              <ul>
                <li><a href='/'>⪼ THỂ LOẠI PHIM </a></li>
                <li><a href='/'>⪼ BÌNH LUẬN PHIM </a></li>
                <li><a href='/'>⪼ BLOG ĐIỆN ẢNH </a></li>
                <li><a href='/'>⪼ PHIM HAY THÁNG </a></li>
              </ul>
            </div>
            <div className="BoxCard">
              <h3 className="titleFooter">HỖ TRỢ</h3>
              <ul>
                <li><a href='/'>⪼ GÓP Ý </a></li>
                <li><a href='/'>⪼ SALE & SERVICES </a></li>
                <li><a href='/'>⪼ RẠP/ GIÁ VÉ</a></li>
                <li><a href='/'>⪼ TUYỂN DỤNG </a></li>
              </ul>
            </div>
            <div className="BoxCard">
              <div className='Footbox_down'>
                <h3 className="titleFooter">KẾT NỐI GALAXY CAMERA</h3>
                <ul className="iconSVG">
                  <li><a href=""><FaFacebook /></a></li>
                  <li><a href=""><FaYoutube /></a></li>
                  <li><a href=""><FaInstagram /></a></li>
                </ul>
              </div>
              <div className='Footbox_down'>
                <h3 className="titleFooter">DOWNLOAD APP</h3>
                <ul className="iconSVG">
                  <li><a href=""><FaAppleAlt /></a></li>
                  <li><a href=""><FaAppStoreIos /></a></li>

                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
      <div className="footerEnd">
        <img src="https://www.galaxycine.vn/website/images/galaxy-logo-footer.png" alt="" />
        <span>FPT Software Hồ Chí Minh</span>
      </div>
    </footer>
  );
}
export default Footer; 