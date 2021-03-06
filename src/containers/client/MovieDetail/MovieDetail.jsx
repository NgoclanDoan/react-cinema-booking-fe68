import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actFetchMovieDetail, actFetchMovieShowTime } from './module/actions';
import moment from 'moment';
import { Rate, Tabs, Button } from 'antd';
import ModalVideo from 'react-modal-video';
import './MovieDetail.scss';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class MovieDetail extends PureComponent {
    componentDidMount() {
        const { movieId } = this.props.match.params;
        const { fetchMovieDetail, fetchMovieShowtime } = this.props;
        fetchMovieDetail(movieId);
        fetchMovieShowtime(movieId);
    }

    constructor() {
        super();
        this.state = {
            isOpen: false,
            videoId: '',
        };
        this.openModal = this.openModal.bind(this);
    }

    openModal(videoId) {
        this.setState({ isOpen: true, videoId });
    }

    renderShowtime = () => {
        const { movieShowtime } = this.props;
        const { TabPane } = Tabs;
        return movieShowtime.heThongRapChieu?.map((theaterSystem, index) => {
            return (
                <Fragment key={index}>
                    <TabPane
                        tab={
                            <img
                                src={theaterSystem.logo}
                                alt={theaterSystem.tenHeThongRap}
                                className="img-theater"
                            />
                        }
                        key={index}
                    >
                        {theaterSystem.cumRapChieu.map((theater, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="d-flex complex-theater mb-2">
                                        <div className="complex__image mr-2">
                                            <img
                                                src={theater.hinhAnh}
                                                alt={theater.tenCumRap}
                                                className="img-theater"
                                            />
                                        </div>
                                        <div className="complex__info mr-auto">
                                            <p>{theater.tenCumRap}</p>
                                            <span>{theater.diaChi}</span>
                                        </div>
                                    </div>
                                    <div className="complex-showtime mb-4">
                                        {theater.lichChieuPhim
                                            .slice(0, 12)
                                            .map((showtime, index) => {
                                                return (
                                                    <Link
                                                        key={index}
                                                        to={`/checkout/${showtime.maLichChieu}`}
                                                    >
                                                        <Button className="m-2">
                                                            {moment(
                                                                showtime.ngayChieuGioChieu
                                                            ).format('hh:mm A')}
                                                        </Button>
                                                    </Link>
                                                );
                                            })}
                                    </div>
                                </Fragment>
                            );
                        })}
                    </TabPane>
                </Fragment>
            );
        });
    };

    render() {
        const { movieDetail } = this.props;
        return (
            <Fragment>
                <ModalVideo
                    channel="youtube"
                    isOpen={this.state.isOpen}
                    videoId={this.state.videoId}
                    onClose={() => this.setState({ isOpen: false })}
                />
                <section className="product">
                    <div className="product__content">
                        <div className="product__overlay">
                            <img
                                src={movieDetail.hinhAnh}
                                className="product__overlay--image"
                                alt="true"
                            />
                            <div className="product__overlay--blur" />
                            <button
                                className="product__overlay--btn"
                                onClick={() =>
                                    this.openModal(`${_.last(_.split(movieDetail.trailer, '/'))}`)
                                }
                            >
                                <img src="../img/play-video.png" alt="true" />
                            </button>
                        </div>
                        <div className="product__main container">
                            <div className="product__mainInfo row">
                                <div className="col-12 col-sm-4 product__left">
                                    <img src={movieDetail.hinhAnh} alt={movieDetail.tenPhim} />
                                    <div className="product__mainInfo--overlay">
                                            <button
                                                onClick={() =>
                                                    this.openModal(`${_.last(_.split(movieDetail.trailer, '/'))}`)
                                                }
                                            >
                                                <img src="../img/play-video.png" alt="true" />
                                            </button>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 product__center">
                                    <p>{moment(movieDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                    <div className="product__title">
                                        <span className="active">c18</span>
                                        <span>{movieDetail.tenPhim}</span>
                                    </div>
                                    <p>100 ph??t - 0 IMDb - 2D/Digital</p>
                                </div>
                                <div className="col-12 col-sm-2 product__right">
                                    <div className="product__process">
                                        <h4>{movieDetail.danhGia}</h4>
                                        <div className="product__process--bar"></div>
                                    </div>
                                    <div className="product__star">
                                        <Rate
                                            className="star"
                                            allowHalf
                                            value={movieDetail.danhGia / 2}
                                        ></Rate>
                                        <h5>320 ng?????i ????nh gi??</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product__review container">
                        <ul
                            className="nav nav-tabs align-items-center justify-content-center"
                            id="myTab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    id="showtimes-tab"
                                    data-toggle="tab"
                                    href="#showtimes"
                                    role="tab"
                                    aria-controls="showtimes"
                                    aria-selected="false"
                                >
                                    L???ch chi???u
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link active"
                                    id="info-tab"
                                    data-toggle="tab"
                                    href="#info"
                                    role="tab"
                                    aria-controls="info"
                                    aria-selected="true"
                                >
                                    Th??ng Tin
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    id="comment-tab"
                                    data-toggle="tab"
                                    href="#comment"
                                    role="tab"
                                    aria-controls="comment"
                                    aria-selected="false"
                                >
                                    ????nh Gi??
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show"
                                id="showtimes"
                                role="tabpanel"
                                aria-labelledby="showtimes-tab"
                            >
                                <Tabs tabPosition="left">{this.renderShowtime()}</Tabs>
                            </div>
                            <div
                                className="tab-pane fade show active"
                                id="info"
                                role="tabpanel"
                                aria-labelledby="info-tab"
                            >
                                <div className="row">
                                    <div className="col-12 col-sm-6 review__tab--left">
                                        <div className="review__tab--text">
                                            <p>Ng??y c??ng chi???u</p>
                                            <p>
                                                {moment(movieDetail.ngayKhoiChieu).format(
                                                    'DD.MM.YYYY'
                                                )}
                                            </p>
                                        </div>
                                        <div className="review__tab--text">
                                            <p>?????o di???n</p>
                                            <p>L?? H???i</p>
                                        </div>
                                        <div className="review__tab--text">
                                            <p>Di???n vi??n</p>
                                            <p>
                                                Ti???t C????ng, Hu???nh ????ng, M???c V??n Khoa, ???c Thanh V??n
                                            </p>
                                        </div>
                                        <div className="review__tab--text">
                                            <p>Th??? Lo???i</p>
                                            <p />
                                        </div>
                                        <div className="review__tab--text">
                                            <p>?????nh d???ng</p>
                                            <p>2D/Digital</p>
                                        </div>
                                        <div className="review__tab--text">
                                            <p>Qu???c Gia SX</p>
                                            <p>Vi???t Nam</p>
                                        </div>
                                        <div className="review__tab--text">
                                            <p>Tin li??n quan</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 review__tab--right">
                                        <div className="review__tab--text">
                                            <p>N???i dung</p>
                                            <p>{movieDetail.moTa}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 review__tab--post">
                                        <img
                                            src="../img/lat-mat-48h-16177782153424.png"
                                            alt="true"
                                        />
                                        <a href="true">
                                            ???n ?????nh ch???c n???ch ng??y kh???i chi???u 16.04, L?? H???i tung
                                            clip L???t M???t: 48H..
                                        </a>
                                        <div className="review__tab--postIcon">
                                            <span className="like">
                                                <img src="../img/like.png" alt="true" />0
                                            </span>
                                            <span className="comment">
                                                <img src="../img/comment.png" alt="true" />0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade container"
                                id="comment"
                                role="tabpanel"
                                aria-labelledby="comment-tab"
                            >
                                <div className="row">
                                    <div className="col-12 review__tab--comment">
                                        <div className="review__tab--commentLeft">
                                            <img src="../img/avatar.png" alt="true" />
                                            <p>B???n ngh?? g?? v??? phim n??y?</p>
                                        </div>
                                        <div className="review__tab--commentRight">
                                            <img src="../img/star1.png" alt="true" />
                                            <img src="../img/star1.png" alt="true" />
                                            <img src="../img/star1.png" alt="true" />
                                            <img src="../img/star1.png" alt="true" />
                                            <img src="../img/star1.png" alt="true" />
                                        </div>
                                    </div>
                                    <div className="col-12 review__tab--listComment">
                                        <div className="review__tab--itemComment">
                                            <div className="row review__tab--itemTop">
                                                <div className="col-6 review__tab--itemLeft">
                                                    <div className="review__tab--itemLeft--icon">
                                                        <img src="../img/avatar.png" alt="true" />
                                                    </div>
                                                    <div className="review__tab--itemLeft--text">
                                                        <h6>Ph????ng</h6>
                                                        <p>24 ng??y tr?????c</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 review__tab--itemRight">
                                                    <div className="review__tab--itemRight--point">
                                                        <p>10</p>
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review__tab--itemCenter">
                                                <p>Ph???i n??i r???ng l?? qu?? hay</p>
                                            </div>
                                            <hr />
                                            <div className="review__tab--itemBot">
                                                <img src="../img/like.png" alt="true" />
                                                <span>10 Th??ch</span>
                                            </div>
                                        </div>
                                        <div className="review__tab--itemComment">
                                            <div className="row review__tab--itemTop">
                                                <div className="col-6 review__tab--itemLeft">
                                                    <div className="review__tab--itemLeft--icon">
                                                        <img src="../img/avatar.png" alt="true" />
                                                    </div>
                                                    <div className="review__tab--itemLeft--text">
                                                        <h6>Long</h6>
                                                        <p>8 ng??y tr?????c</p>
                                                    </div>
                                                </div>
                                                <div className="col-6 review__tab--itemRight">
                                                    <div className="review__tab--itemRight--point">
                                                        <p>10</p>
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                        <img src="../img/star1.png" alt="true" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review__tab--itemCenter">
                                                <p>Ph???i n??i r???ng l?? qu?? hay, ?????nh c???a ch??p</p>
                                            </div>
                                            <hr />
                                            <div className="review__tab--itemBot">
                                                <img src="../img/like.png" alt="true" />
                                                <span>68 Th??ch</span>
                                            </div>
                                        </div>
                                        <div className="review__tab--itemComment reply">
                                            <div className="review__tab--itemCommentParent">
                                                <div className="review__tab--itemCommentTop">
                                                    <div className="row review__tab--itemTop">
                                                        <div className="col-6 review__tab--itemLeft">
                                                            <div className="review__tab--itemLeft--icon">
                                                                <img
                                                                    src="../img/avatar.png"
                                                                    alt="true"
                                                                />
                                                            </div>
                                                            <div className="review__tab--itemLeft--text">
                                                                <h6>T?????ng</h6>
                                                                <p>12 ng??y tr?????c</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 review__tab--itemRight">
                                                            <div className="review__tab--itemRight--point">
                                                                <p>10</p>
                                                                <img
                                                                    src="../img/star1.png"
                                                                    alt="true"
                                                                />
                                                                <img
                                                                    src="../img/star1.png"
                                                                    alt="true"
                                                                />
                                                                <img
                                                                    src="../img/star1.png"
                                                                    alt="true"
                                                                />
                                                                <img
                                                                    src="../img/star1.png"
                                                                    alt="true"
                                                                />
                                                                <img
                                                                    src="../img/star1.png"
                                                                    alt="true"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="review__tab--itemCenter">
                                                        <p>
                                                            Phim c???a anh L?? H???i ch??a bao gi??? l??m
                                                            m??nh th???t v???ng
                                                        </p>
                                                    </div>
                                                    <hr />
                                                    <div className="review__tab--itemReply">
                                                        <div className="review__tab--itemBot--like">
                                                            <img
                                                                className="like"
                                                                src="../img/like.png"
                                                                alt="true"
                                                            />
                                                            <span>86 Th??ch</span>
                                                        </div>
                                                        <div className="review__tab--itemBot--comment">
                                                            <img
                                                                className="comment"
                                                                src="../img/comment.png"
                                                                alt="true"
                                                            />
                                                            <span>16 B??nh Lu???n</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review__tab--itemCommentChild">
                                                <div className="row review__tab--itemTop">
                                                    <div className="col-12 review__tab--itemLeft">
                                                        <div className="review__tab--itemLeft--icon">
                                                            <img
                                                                src="../img/avatar.png"
                                                                alt="true"
                                                            />
                                                        </div>
                                                        <div className="review__tab--itemLeft--text">
                                                            <h6>H??n Pro</h6>
                                                            <p>12 ng??y tr?????c</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review__tab--itemCenter">
                                                    <p>
                                                        Phim c???a anh L?? H???i ch??a bao gi??? l??m m??nh
                                                        th???t v???ng
                                                    </p>
                                                </div>
                                                <div className="review__tab--itemBot">
                                                    <span>68 Th??ch</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="review__btn text-center">
                                    <button>Xem Th??m</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieDetail: state.clientMovieDetailReducer.movieDetail,
        movieShowtime: state.clientMovieDetailReducer.movieShowtime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovieDetail: (movieId) => dispatch(actFetchMovieDetail(movieId)),
        fetchMovieShowtime: (movieId) => dispatch(actFetchMovieShowTime(movieId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
