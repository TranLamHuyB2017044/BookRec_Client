import React, { useEffect, useState } from 'react'
// import RecommendBook from './RecommendBook'
import { PublicRequest } from '../../service/Request'
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import myAlert from '../../Components/AlertComponent/Alert.js'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, TextField } from '@mui/material';

export default function BookRating({ Star, book_id, showRating }) {
	const [ratings, setRatings] = useState([])
	const [StatisticRating, setStatisticRating] = useState()
	const [allMedia, setAllMedia] = useState([])
	const [ratingPerStar, setRatingPerStar] = useState([])
	const [num_rating, setNumRating] = useState()
	const user = useSelector(state => state.user.currentUser)
	const [isReplyOpen, setIsReplyOpen] = useState(null)
	const isAdmin = user != null ? user.admin_role : false;
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		const getUserRatings = async () => {
			try {
				const response = await PublicRequest.get(`/rating/${book_id}`)
				setRatings(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		getUserRatings()

	}, [book_id])


	const handleCreatedTime = (time) => {
		const subTime = time.indexOf('T')
		const newTime = time.substring(0, subTime)
		const date = newTime.split('-')
		const day = date[2]
		const month = date[1]
		const year = date[0]
		const newDate = `${day}-${month}-${year}`
		return newDate
	}


	function isFileImage(file) {
		const acceptedImageTypes = ['jpg', 'jpeg', 'png', 'webp'];
		return file && acceptedImageTypes.includes(file)
	}

	const getFileTypes = (file) => {
		if (typeof (file) === 'string') {
			return file.split('.').pop().toLowerCase();
		}
	}



	const [userRatings, setUserRatings] = useState([])
	useEffect(() => {
		if (ratings.length > 0) {
			const ratingItems = [...ratings]
			const updatedRatingMedia = [];
			ratings.forEach(rating => {
				const media = [];
				if (rating.urls !== null) {
					const urls = rating.urls.includes(',') ? rating.urls.split(',') : [rating.urls];
					urls.forEach(item => {
						const fileType = getFileTypes(item);
						const isImage = isFileImage(fileType);
						media.push({ url: item, type: isImage ? 1 : 0 });
					});
				}
				updatedRatingMedia.push(media);
			});
			const ratingMedia = updatedRatingMedia
			const handleMedia = () => {
				for (let i = 0; i < ratingMedia.length; i++) {
					ratingItems[i].urls = ratingMedia[i]
				}
				setUserRatings(ratingItems)
			}
			handleMedia()
		}
	}, [ratings])


	useEffect(() => {
		const getStatics = async () => {
			const response = await PublicRequest.get(`/rating/statistic/${book_id}`)
			setStatisticRating(response.data.info)
			setAllMedia(response.data.all_media)
			setRatingPerStar(response.data.rating_per_star)
			setNumRating(response.data.numRating[0])
		}
		getStatics()
	}, [])


	const [allUserMedia, setAllUserMedia] = useState([])

	useEffect(() => {
		if (allMedia.length > 0) {
			const newMediaUpdate = []
			allMedia?.forEach(media => {
				if (media.url !== null) {
					const url = media.url.includes(',') ? media.url.split(',') : media.url;
					const fileType = getFileTypes(url);
					const isImage = isFileImage(fileType);
					newMediaUpdate.push({ url: url, type: isImage ? 1 : 0 });
				}
			})
			setAllUserMedia(newMediaUpdate)
		}
	}, [allMedia])

	const [selectedStar, setSelectedStar] = useState(null);

	const handleFilterRatingPerStar = async (n_star) => {
		setSelectedStar(n_star)
		try {
			const rs = await PublicRequest.get(`/rating/filter/${book_id}?n_star=${n_star}`)
			if (rs.status === 200) {
				setRatings(rs.data)
			}
		} catch (error) {
			myAlert.Alert('error', error.message)
		}
	}

	const handleHiddenRating = async (rating_id) => {

		try {
			myAlert.Confirm('Ẩn bình luận', 'question', 'Xác nhận ẩn bình luận này', 'Có', 'Không')
				.then(async (result) => {
					if (result.value) {
						const { value: password } = await Swal.fire({
							title: "Vui lòng nhập password của bạn để xác nhận ẩn bình luận",
							input: "password",
							inputLabel: "Password",
							inputPlaceholder: "Enter your password",
							inputAttributes: {
								maxlength: "10",
								autocapitalize: "off",
								autocorrect: "off"
							}
						});

						if (password) {
							const response = await PublicRequest.post('/user/login/admin', { email: user.email, password: password });
							if (response.status === 200) {
								await PublicRequest.put(`/rating/reply/${rating_id}`);
								myAlert.Alert('success', 'Ẩn bình luận thành công');
								setTimeout(() => {
									window.location.reload();
								}, 2000)
							} else {
								Swal.fire(`Sai mật khẩu`);
							}
						}

					}
				})
				.catch(error => {
					const errorMessage = error.response?.data || "An error occurred.";
					myAlert.Alert("error", errorMessage);
				});
		} catch (error) {

		}
	}

	const toggleReply = (id) => {
		setIsReplyOpen(isReplyOpen === id ? null : id);
	};

	const [replyValue, setReplyValue] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		const data = {
			rating_id: isReplyOpen,
			content: replyValue,
		}
		try {
			if (data.content === '') {
				myAlert.Alert("info", "Vui lòng nhập nội dung phản hồi trước khi gửi")
				setLoading(false)
				return;
			}
			const rs = await PublicRequest.post('/reply/', data)
			if (rs.status === 200) {
				setLoading(false)
				myAlert.Alert('success', 'Phản hồi thành công !')
				setTimeout(() => {
					window.location.reload();
				}, 2000)
			}
		} catch (error) {
			setLoading(false)
			myAlert.Alert('error', 'Phản hồi không thành công vui lòng thử lại')

		}
	};

	return (
		<div>
			<div className='bg-[#ffff] max-w-[1300px] mx-auto p-10 rounded-lg border mb-4'>
				<h1 className='text-3xl  font-bold'>Đánh giá sản phẩm</h1>
				<div>
					<div>
						<p className='my-4 text-3xl'>Tổng quan</p>
						<div className='my-3'>
							<p className='text-4xl mb-2'>{Math.ceil(StatisticRating?.avg_star)} {Star(StatisticRating?.avg_star > 0 ? Math.ceil(StatisticRating?.avg_star) : 5, StatisticRating?.avg_star > 0 ? 'yellow' : 'gray')}</p>
							<p>({num_rating?.number_rating} đánh giá)</p>
						</div>
						<div>
							{ratingPerStar.map((items, index) => (
								<div key={index} className='flex items-center gap-4'>
									<p className='text-3xl min-w-[100px]'>{Star(Math.ceil(items.n_star), 'yellow')}</p>
									<div className="progress w-[150px] h-3 mt-[5px]">
										<div className={`progress-bar w-[${Math.min(100, (items?.num_rating * 10))}px]`} aria-valuenow='70'
											aria-valuemin="0" aria-valuemax="100" >
										</div>
									</div>
									<p className='opacity-85 text-2xl mt-1'>{items.num_rating}</p>
								</div>))}
						</div>
					</div>
					<div className='my-5 border-t'>
						<h1 className='my-4 text-3xl'>Tất cả hình ảnh/video ({StatisticRating?.all_media})</h1>
						<div className='flex justify-between items-center'>
							<div className='flex  items-center gap-4'>
								{allUserMedia?.map((item, index) => (
									<LightGallery data-src={item.url || ''} speed={500} plugins={[lgThumbnail, lgZoom]} key={index} >
										{
											item.type === 1 ?
												(
													<div data-src={item.url}>
														<img className='object-cover w-[80px] h-[80px] cursor-pointer rounded-2xl' src={item.url} alt={`ratings-img-${index + 1}`} />
													</div>
												) :
												(
													<div data-src={item.url}>
														<video className={`cursor-pointer w-[80px] h-[80px] rounded-2xl`} controls >
															<source src={item.url} type="video/mp4" />
														</video>
													</div>
												)
										}
									</LightGallery>
								)).slice(-8)}
							</div>
							<button onClick={showRating} className='mr-8 py-[8px] px-4 bg-red-500 hover:bg-red-600 border text-white rounded-md min-w-[120px] text-center' >Đánh giá</button>
						</div>

					</div>
					<div className='my-5 border-t'>
						<h1 className='my-4 text-3xl'>Lọc theo</h1>
						<div className='flex gap-8 items-center'>
							{[5, 4, 3, 2, 1].map((nStar) => (
								<button key={nStar} onClick={() => handleFilterRatingPerStar(nStar)}>
									<span
										className={`border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300 ${selectedStar === nStar ? 'bg-slate-400 text-white' : ''
											}`}
									>
										{nStar} sao
									</span>
								</button>
							))}
						</div>
					</div>
					<div className='my-5'>
						{userRatings.length > 0 ? userRatings.map((rating, index) => (
							<div className='border-top p-10' key={index}>
								<div className='flex  justify-between'>
									<div className='flex items-center gap-4'>
										<div className='rounded-full '>
											<img className='rounded-full w-[70px] h-[70px]' src={rating.user_ava} alt="user-ava" />
										</div>
										<p className='text-3xl'>{rating.fullname}</p>
									</div>
									{isAdmin === 1 && <div className='px-4'>
										{!rating.reply_content && <button onClick={() => toggleReply(rating.rating_id)} className='mr-8 h-[40px] py-[8px] px-4 bg-blue-500 hover:bg-blue-600 border text-white rounded-md min-w-[120px] text-center' >Phản hồi đánh giá</button>}
										<button onClick={() => handleHiddenRating(rating.rating_id)} className='mr-8 h-[40px] py-[8px] px-4 bg-gray-500 hover:bg-gray-600 border text-white rounded-md min-w-[120px] text-center' >Ẩn đánh giá</button>
									</div>}
								</div>
								<div className='flex items-center gap-4 my-4'>
									<p className='text-4xl'>{Star(rating.n_star, 'yellow')}</p>
									{/* {rating.user_status && <p className={'mt-2 bg-[#38969e] text-white text-3xl border px-5 py-2 rounded-lg'}>{rating.user_status}</p>} */}
								</div>
								<p className='my-5'>
									{rating.content}
								</p>
								<div className='flex  items-center gap-4'>
									{rating.urls?.length > 1 ? rating?.urls.map((item, id) => (
										<LightGallery data-src={item.url || ''} speed={500} plugins={[lgThumbnail, lgZoom]} width='10%' height='100%' key={id} >
											{item.type === 1 ? (
												<div data-src={item.url}>
													<img className='cursor-pointer w-[100px] h-[100px] rounded-2xl' src={item.url} alt={`img_rating_${index + 1}`} />
												</div>
											) :
												<div data-src={item.url}>
													<video className={`cursor-pointer w-[100px] h-[100px] rounded-2xl`} controls>
														<source src={item.url} type="video/mp4" />
													</video>
												</div>
											}
										</LightGallery>)) : ''}
									{rating.urls?.length === 1 && <LightGallery data-src={rating.urls[0].url || ''} speed={500} plugins={[lgThumbnail, lgZoom]} width='10%' height='100%' >
										{rating.urls[0].type === 1 ? (
											<div data-src={rating.urls[0].url}>
												<img className='cursor-pointer w-[100px] h-[100px] rounded-2xl' src={rating.urls[0].url} alt={`img_rating_${index + 1}`} />
											</div>
										) :
											<div data-src={rating.urls[0].url}>
												<video className={`cursor-pointer w-[100px] h-[100px] rounded-2xl`} controls>
													<source src={rating.urls[0].url} type="video/mp4" />
												</video>
											</div>
										}
									</LightGallery>}
								</div>
								<p className='mt-20 text-gray-500 ml-5 italic opacity-75'>Đã đánh giá vào ngày {handleCreatedTime(rating.created_at)}</p>
								{
									isReplyOpen === rating.rating_id && <form onSubmit={handleSubmit} className='bg-[#f5f5fa] px-8 py-4 rounded-xl mt-5 w-fit flex items-center gap-4'>
										<TextField
											name={`reply-${rating.rating_id}`}
											id={`reply-${rating.rating_id}`}
											variant="outlined"
											label="Nhập nội dung phản hồi"
											fullWidth
											sx={{
												fontSize: '18px',
												'.MuiInputBase-input': { padding: '12px 16px' },
												'.MuiOutlinedInput-root': { fontSize: '16px' },
											}}
											value={replyValue}
											onChange={(e) => setReplyValue(e.target.value)}
										/>
										<Button
											variant="outlined"
											color="primary"
											sx={{
												fontSize: '16px',
												padding: '8px 24px',
												textTransform: 'none',
											}}
											type='submit'
											disabled = {loading}
										>
											Gửi
										</Button>

									</form>
								}
								{rating.reply_content &&
									<div className='bg-[#f5f5fa] px-8 py-4 rounded-xl mt-5'>
										<div className='flex gap-8 items-center'>

											<div className='rounded-full '>
												<img className='rounded-full w-[50px] h-[50px]' src='https://static.vecteezy.com/system/resources/previews/017/128/657/non_2x/little-boy-kid-reading-book-logo-icon-in-flat-design-vector.jpg' alt="user-ava" />
											</div>
											<div className='flex items-center gap-2'><p>BookRec Care <CheckCircleIcon className='text-blue-500' fontSize='medium' /> |</p><p className='text-gray-500 italic opacity-75'>Đã phản hồi vào ngày {handleCreatedTime(rating.reply_time)}</p></div>
										</div>
										<p>{rating.reply_content}</p>
									</div>}
							</div>)) : ''}
					</div>
				</div>
			</div>
			{/* <RecommendBook books={books} Star={Star} /> */}
		</div>
	)
}
