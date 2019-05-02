import Link from 'next/link';

class TopStores extends React.Component {
	render() {
		return (
			<div>
                <div className='multi-vendor-stores-wrapper'>
					<div className='line-display stores-title'>Stores: </div>
					<Link href=''>
						<a>
							<div className='line-display single-store'>
								<img src='https://res.cloudinary.com/hehe/image/upload/v1556532890/multi-vendor/NoPath_-_Copy.png' />
							</div>
						</a>
					</Link>
					<Link href=''>
						<a>
							<div className='line-display single-store'>
								<img src='https://res.cloudinary.com/hehe/image/upload/v1556532890/multi-vendor/LOGO_copy_2.png' />
							</div>
						</a>
					</Link>
					<Link href=''>
						<a>
							<div className='line-display single-store'>
								<img src='https://res.cloudinary.com/hehe/image/upload/v1556532890/multi-vendor/NoPath.png' />
							</div>
						</a>
					</Link>
					<Link href=''>
						<a>
							<div className='line-display single-store'>
								<img src='https://res.cloudinary.com/hehe/image/upload/v1556532890/multi-vendor/Group_7.png' />
							</div>
						</a>
					</Link>
					<Link href=''>
						<a>
							<div className='line-display single-store'>
								<img src='https://res.cloudinary.com/hehe/image/upload/v1556532890/multi-vendor/NoPath_-_Copy_5.png' />
							</div>
						</a>
					</Link>
					<div className='line-display'>
						<span className='more-link'><Link href=''><a>more +</a></Link></span>
					</div>
                </div>
            </div>
		);
	}
}

export default TopStores;