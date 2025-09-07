import SubscribeButton from "@/components/channel/SubscribeButton";
import DonationButton from "@/components/monetization/DonationButton";
import MessageButton from "@/components/messages/MessageButton";

export default async function ChannelPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  const channelStats = {
    subscribers: 1245,
    totalHoursWatched: 2850,
    isEligibleForMonetization: false
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header del canal */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">@{username}</h1>
              <p className="text-gray-600">Creador de contenido en Vryno</p>
              
              {!channelStats.isEligibleForMonetization && (
                <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-md p-2">
                  <p className="text-yellow-700 text-sm">
                    ⏳ Este canal está en camino a la monetización ({channelStats.subscribers}/1000 suscriptores, {channelStats.totalHoursWatched}/3000 horas)
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <SubscribeButton channelId={username} />
              <MessageButton username={username} />
              <DonationButton 
                channelId={username} 
                channelName={username}
                isEligibleForMonetization={channelStats.isEligibleForMonetization}
              />
            </div>
          </div>
        </div>
        {/* ... resto del código ... */}
      </div>
    </div>
  );
}