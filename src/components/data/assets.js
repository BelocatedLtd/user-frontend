const socialPlatforms = [
    {
        'assetplatform': 'facebook',
        assets: [
            {
                asset: 'Facebook Friend',
                verification: 'Screenshot showing user has sent a friend request to the account',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Page Likes',
                verification: 'Screenshot showing user has liked the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Page Followers',
                verification: 'Screenshot showing user followed the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post Likes',
                verification: 'Screenshot showing user has liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video Views',
                verification: '3 different screenshots at different view time showing user viewing the video',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Comment',
                verification: 'Screenshot showing user commended based on comment options and samples sent by client or something close',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                verification: "Screenshot showing user's post on their profile after being shared",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
            asset: 'Get People to Post Your Content On Facebook',
            verification: 'Screenshot of the clients content being posted on their page',
            CostToOrder: 5,
            amountForTask: 3,
            },
        ]
    },

    {
        'assetplatform': 'instagram',
        assets: [
            {
                asset: 'Page Followers',
                verification: 'Screenshot showing user followed the particuler page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post Likes',
                verification: 'Screenshot showing user liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video Views',
                verification: '3 different screenshots at different view time showing different part of the viewing video',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Instagram Story View',
                verification: '2 different screenshots at different view time showing different part of the viewing video',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Comment',
                verification: 'Screenshot showing user commented based on comment options and samples sent by client or something close',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                verification: ' Screenshot showing user’s post shared to another friend on Instagram or on story after being shared',
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Get People To Post Your Content On Their Instagram',
                verification: 'Screenshot of the clients content being posted on their page.',
                CostToOrder: 100,
                amountForTask: 50,
            }
        ]
    },
    {
        'assetplatform': 'twitter',
        assets: [
            {
                asset: 'Page Followers',
                verification: 'Screenshot showing user Followed the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post likes',
                verification: 'Screenshot showing user has liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video View',
                verification: '2 different screenshots at different view time showing different part of the viewing video.',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Comment',
                verification: 'Screenshot showing user commented based on comment options and samples sent by client or something close',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Retweet',
                verification: 'Screenshot showing user’s has retweeted the particular tweet',
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Quote Tweet',
                verification: 'Screenshot showing user’s has quoted the particular tweet, quote based on quote options and samples sent by client',
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Get People To Join Twitter Space',
                verification: 'Screenshot While listening to the space at 3 different occasions. Screenshots must not be same',
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Get People To Post Your Content On Their Twitter Page',
                verification: 'Screenshot of the clients content being posted on their page',
                CostToOrder: 100,
                amountForTask: 50,
            }
        ]
    },
    {
        'assetplatform': 'tiktok',
        assets: [
            {
                asset: 'Page Followers',
                verification: 'Screenshot showing user Followed the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post likes',
                verification: 'Screenshot showing user has liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video View',
                verification: '2 different screenshots at different view time showing different part of the viewing video.',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'TikTok Favourites',
                verification: 'Screenshot Showing user has Favourited the post',
                CostToOrder: 5,
                amountForTask: 2.5,
            },
            {
                asset: 'Comment',
                verification: 'Screenshot showing user commented based on comment options and samples sent by client or something close.',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                verification: "Screenshot showing user’s post shared to another friend on Tiktok or on user’s page",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Share With Comment',
                verification: "Screenshot showing user’s post shared on page with comment",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Get People To Post Your Content On Their TikTok',
                verification: "Screenshot of the clients content being posted on their page",
                CostToOrder: 100,
                amountForTask: 50,
            }
        ]
    },
    {
        'assetplatform': 'youtube',
        assets: [
            {
                asset: 'Subscribers',
                verification: "Screenshot showing user Subscribed to the particular page.",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Post likes',
                verification: "Screenshot showing user has liked the particular Video, short or picture post.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Video View',
                verification: "5 different screenshots at different view time showing different part of the viewing video",
                CostToOrder: 30,
                amountForTask: 15,
            },
            {
                asset: 'Comment',
                verification: "Screenshot showing user commented based on comment options and samples sent by client or something close.",
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share To Other Social Media Platforms.',
                verification: "Screenshot showing user’s post shared to another Social Media platform.",
                CostToOrder: 50,
                amountForTask: 25,
            }
        ]
    },
    {
        'assetplatform': 'linkedin',
        assets: [
            {
                asset: 'LinkedIn Connect',
                verification: "Screenshot showing user Connected to the particular page",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'LinkedIn Follow',
                verification: "Screenshot showing user Followed the particular page",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post likes',
                verification: "Screenshot showing user has liked the particular Video, short or picture post",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Send Content To Other LinkedIn Connect/Friend',
                verification: "Screenshot DM Showing it was sent to a Connect/Friend on LinkedIn",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Comment',
                verification: " Screenshot showing user commented based on comment options and samples sent by client or something close",
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Repost',
                verification: "Screenshot showing user reposted post on Feed/Page",
                CostToOrder: 30,
                amountForTask: 15,
            },
            {
                asset: 'Repost With comment',
                verification: " Screenshot showing user reposted post on Feed/Page with comment based in Comment Options and samples if provided by client",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Get Peoplee to Post On Their LinkedIn Page',
                verification: "Screenshot of the clients Content on their page",
                CostToOrder: 100,
                amountForTask: 50,
            }

        ]
    },
    {
        'assetplatform': 'whatsapp',
        assets: [
            {
                asset: 'Get People to Post content on their WhatsApp Status',
                verification: "Screenshot of the clients Content on your whatsApp status",
                CostToOrder: 150,
                amountForTask: 75,
            }
        ]
    },
    {
        'assetplatform': 'iOS App Download',
        assets: [
            {
                asset: 'Get People to Download App on iOS',
                verification: "2 Screenshot 1st screenshot showing the downloading process. 2nd screenshot in iOS Store that you have downloaded",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Get People to Download App on iOS and Review',
                verification: "4 Screenshot 1st screenshot showing the downloading process. 2nd screenshot in iOS Store that you have downloaded. 3rd screenshot in iOS Store showing the Rating selected. 4th Screenshot Showing you write and submit the review based on clients Prefered Review comment.",
                CostToOrder: 150,
                amountForTask: 75,
            },
            {
                asset: 'Get People to Download App on iOS, Review and Register on App',
                verification: " 5 Screenshot 1st screenshot showing the downloading process. 2nd screenshot in iOS Store that you have downloaded. 3rd screenshot in iOS Store showing the Rating selected. 4th Screenshot Showing you write and submit the review based on clients Prefered Review comment. 5th Screenshot showing user in app and registered",
                CostToOrder: 200,
                amountForTask: 100,
            }

        ]
    },
    {
        'assetplatform': 'android app download',
        assets: [
            {
                asset: 'Get People to Download App on Android PlayStore',
                verification: "2 Screenshot. 1st screenshot showing the downloading process. 2nd screenshot in Android PlayStore that you have downloaded",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Get People to Download App on android PlayStore and Review',
                verification: "4 Screenshot. 1st screenshot showing the downloading process. 2nd screenshot in Android PlayStore that you have downloaded. 3rd screenshot in Android PlayStore showing the Rating selected. 4th Screenshot Showing you write and submit the review based on clients Prefered Review comment",
                CostToOrder: 150,
                amountForTask: 75,
            },
            {
                asset: 'Get People to Download App on Android PlayStore, Review and Register on App',
                verification: " 5 Screenshot. 1st screenshot showing the downloading process. 2nd screenshot in Android PlayStore that you have downloaded. 3rd screenshot in Android PlayStore showing the Rating selected. 4th Screenshot Showing you write and submit the review based on clients Prefered Review comment.5th Screenshot showing user in app and registered.",
                CostToOrder: 200,
                amountForTask: 100,
            },
        ]
    },
    {
        'assetplatform': 'boomplay',
        assets: [
            {
                asset: 'Follow',
                verification: "Screenshot showing user Followed the particular page.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Like/Favourite',
                verification: "Screenshot showing user likes the content.",
                CostToOrder: 5,
                amountForTask: 2.5,
            },
            {
                asset: 'Comment',
                verification: "Screenshot comment on the content after it’s been posted on the page based on comment options and samples sent by client or something close.",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Stream',
                verification: "4 different Screenshot at 4 different occasions while streaming",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Share',
                verification: "Screenshot showing user’s content shared to another Social Media Platform",
                CostToOrder: 50,
                amountForTask: 25,
            }
        ]
    },
    {
        'assetplatform': 'audiomack',
        assets: [
            {
                asset: 'Follow',
                verification: "Screenshot showing user Followed the particular page.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Like',
                verification: "Screenshot showing user likes the content.",
                CostToOrder: 5,
                amountForTask: 2.5,
            },
            {
                asset: 'Comment',
                verification: "Screenshot comment on the content after it’s been posted on the page based on comment options and samples sent by client or something close.",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Stream',
                verification: "4 different Screenshot at 4 different occasions while streaming",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Share',
                verification: "Screenshot showing user’s content shared to another Social Media Platform",
                CostToOrder: 50,
                amountForTask: 25,
            }
        ]
    },
    {
        'assetplatform': 'spotify',
        assets: [
            {
                asset: 'Follow',
                verification: "Screenshot showing user Followed the particular page.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Add to Liked Songs',
                verification: "Screenshot showing user likes the content.",
                CostToOrder: 5,
                amountForTask: 2.5,
            },
            {
                asset: 'Stream',
                verification: "4 different Screenshot at 4 different occasions while streaming",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Share',
                verification: "Screenshot showing user’s content shared to another Social Media Platform",
                CostToOrder: 50,
                amountForTask: 25,
            }
        ]
    },
]

export default socialPlatforms


