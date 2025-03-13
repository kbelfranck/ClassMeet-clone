'use client';

import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, MessageSquare } from 'lucide-react';
import { Channel, MessageList, MessageInput, Window, useChatContext } from 'stream-chat-react';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = searchParams ? !!searchParams.get('personal') : false;
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const call = useCall();
  const { client } = useChatContext();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const chatChannel = client.channel('messaging', `call-${call?.id}`);

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>

        {/* Participants Panel */}
        {showParticipants && (
          <div className="fixed right-0 top-0 h-full w-[350px] bg-dark-2">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}

        {/* Chat Panel */}
        {showChat && (
  <div className="fixed right-0 top-0 h-full w-[350px] bg-dark-2 flex flex-col">
    <Channel channel={chatChannel}>
      <Window>
        <div className="str-chat__header p-4 bg-[#202c33] border-b border-[#2a3942]">
          <h2 className="str-chat__header-title text-white font-bold">Chat</h2>
          <button 
            onClick={() => setShowChat(false)}
            className="str-chat__header-close text-white"
          >
            ×
          </button>
        </div>
        <MessageList />
        <MessageInput
          additionalTextareaProps={{
            placeholder: 'Type a message...',
            style: {
              backgroundColor: '#2a3942',
              color: 'white',
              borderRadius: '8px',
              padding: '10px',
              border: 'none',
              resize: 'none',
            },
          }}
        />
      </Window>
    </Channel>
  </div>
)}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button onClick={() => {
          setShowChat(prev => !prev);
          setShowParticipants(false);
        }}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <MessageSquare size={20} className="text-white" />
          </div>
        </button>

        <button onClick={() => {
          setShowParticipants(prev => !prev);
          setShowChat(false);
        }}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;