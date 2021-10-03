import React, { useMemo } from 'react'
import InstaImage from './InstaImage'

const InstaMessagesContainer = ({ posts, index, isMobile }) => {
  const width = useMemo(() => (isMobile ? '100%' : '32%'), [isMobile])

  return (
    <div
      key={`instamessages-${index}`}
      style={{
        //
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {Array.isArray(posts) ? (
        posts.map((i, index) => {
          const { id, media_url, caption, permalink } = i

          return (
            <div style={{ width, height: '100%' }} key={`${media_url}-${index}`}>
              <InstaImage media_url={media_url} permalink={permalink} caption={caption} />
            </div>
          )
        })
      ) : (
        <div style={{ width, height: '100%' }} key={`${posts.media_url}-${index}`}>
          <InstaImage media_url={posts.media_url} permalink={posts.permalink} caption={posts.caption} />
        </div>
      )}
    </div>
  )
}

export default InstaMessagesContainer
