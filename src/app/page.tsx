"use client";
import React, { useState, useEffect } from "react";

interface Room {
  name: string;
  hashtag: string;
  url: string;
  lastUsed: string; // 最終利用時刻
}

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState(""); // 新規作成用
  const [newHashtag, setNewHashtag] = useState(""); // 新規作成用
  const [newUrl, setNewUrl] = useState(""); // 新規作成用

  const [editRoomName, setEditRoomName] = useState(""); // 編集用
  const [editHashtag, setEditHashtag] = useState(""); // 編集用
  const [editUrl, setEditUrl] = useState(""); // 編集用
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState(""); // 検索用
  const [isShowModal, setIsShowModal] = useState(false); // モーダルの表示管理

  const [addErrorMessages, setAddErrorMessages] = useState<string>(); // エラーメッセージ

  // localStorageからルームデータを読み込む
  useEffect(() => {
    const storedRooms = localStorage.getItem("chatRooms");
    if (storedRooms) {
      setRooms([...JSON.parse(storedRooms)].sort(
        (a, b) =>
          new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
      ));
    }
  }, []);

  // 現在の日時を取得する関数
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("ja-JP", { hour12: false });
  };

  // ルームを追加する関数
  const addRoom = () => {
    if (!newRoomName || !newUrl) {
      setAddErrorMessages("ルーム名とURLを入力してください");
      return;
    }
    setAddErrorMessages("");
    const newRoom: Room = {
      name: newRoomName,
      hashtag: newHashtag,
      url: newUrl,
      lastUsed: getCurrentDateTime(),
    };
    const updatedRooms = [...rooms, newRoom];
    setRooms(
      [...updatedRooms].sort(
        (a, b) =>
          new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
      )
    );
    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms));

    // 新規作成の入力フィールドをリセット
    setNewRoomName("");
    setNewHashtag("");
    setNewUrl("");

    // モーダルを閉じる
    setIsShowModal(false);
  };

  // ルームを更新する関数
  const updateRoom = () => {
    if (editIndex === null || !editRoomName || !editUrl) return;

    const updatedRooms = [...rooms];
    updatedRooms[editIndex] = {
      name: editRoomName,
      hashtag: editHashtag,
      url: editUrl,
      lastUsed: updatedRooms[editIndex].lastUsed,
    };
    setRooms(updatedRooms);
    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms));
    setEditIndex(null); // 編集モードを終了
  };

  // ルームを削除する関数
  const deleteRoom = (index: number) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms));
  };

  // ルームを編集する関数
  const editRoom = (index: number) => {
    const roomToEdit = rooms[index];
    setEditRoomName(roomToEdit.name);
    setEditHashtag(roomToEdit.hashtag);
    setEditUrl(roomToEdit.url);
    setEditIndex(index); // 編集モードに切り替え
  };

  // ルームが開かれたときに最終利用時刻を更新する関数
  const openRoom = (index: number) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].lastUsed = getCurrentDateTime(); // 現在の日時に更新

    setRooms(
      [...updatedRooms].sort(
        (a, b) =>
          new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
      )
    );
    localStorage.setItem(
      "chatRooms",
      JSON.stringify(
        [...updatedRooms].sort(
          (a, b) =>
            new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
        )
      )
    );
  };

  // 検索結果をフィルタリングする関数
  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.hashtag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* 新規ルーム作成ボタン */}
      {rooms.length === 0 ? (
        <div className="mt-14 mb-10">
          <h3 className="text-xl font-semibold mb-2 text-[#e8e8e8]">
            新しいルームを追加 +
          </h3>
          <div className="flex flex-col space-y-4 mb-4 ">
            <input
              type="text"
              className="rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
              placeholder="ルーム名"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
            <input
              type="text"
              className="rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
              placeholder="ハッシュタグ"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
            />
            <input
              type="url"
              className="rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
              placeholder="ルームのURL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
          {addErrorMessages && (
            <p className="text-red-500 text-center">{addErrorMessages}</p>
          )}
          <div className="flex justify-end">
            <button
              className="bg-[#f8f8f8] text-[#2f2f2f] py-2 px-4 rounded-md"
              onClick={addRoom}
            >
              ルームを追加
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-4 sticky top-16 mb-14 left-0 bg-[#212121] z-10">
          <div className={"mt-3 bg-[#2f2f2f] rounded-xl"}>
            <input
              type="text"
              className=" rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
              placeholder="ルーム名やハッシュタグで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* モーダル（ルーム追加） */}
      {isShowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#2f2f2f] p-6 rounded-md shadow-md max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4 text-[#e8e8e8]">
              新しいルームを追加
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="border-[#3f3f3f] border-[1.5px] rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
                placeholder="ルーム名"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
              <input
                type="text"
                className="border-[#3f3f3f] border-[1.5px] rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
                placeholder="ハッシュタグ"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
              />
              <input
                type="url"
                className="border-[#3f3f3f] border-[1.5px] rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
                placeholder="ルームのURL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              {addErrorMessages && (
                <p className="text-red-500 text-center">{addErrorMessages}</p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  className=" text-[#e8e8e8] py-2 px-4 rounded-md"
                  onClick={() => setIsShowModal(false)}
                >
                  キャンセル
                </button>
                <button
                  className="bg-[#f8f8f8] text-[#2f2f2f] py-2 px-4 rounded-md"
                  onClick={addRoom}
                >
                  ルームを追加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ルーム一覧 */}
      <div>
        <div className="flex flex-row">
          <h3 className="text-xl font-semibold mb-4 text-[#e8e8e8] grow">
            ルーム一覧
          </h3>
          <button
            onClick={() => setIsShowModal(true)}
            className="text-black hover:bg-[#2f2f2f] mb-2 h-9 p-2 rounded-lg text-xl font-semibold"
          >
            <h3 className="text-sm font-semibold mb-2 text-[#e8e8e8] sticky">
              新しいルームを追加 +
            </h3>
          </button>
        </div>
        {filteredRooms.length === 0 ? (
          <p className="text-gray-500">ルームが見つかりません。</p>
        ) : (
          <ul className="space-y-4">
            {filteredRooms.map((room, index) => (
              <li
                key={index}
                className=" bg-[#2f2f2f] rounded-md p-4 flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <a
                      href={room.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#e8e8e8] hover:underline"
                      onClick={() => openRoom(index)} // ルームが開かれたときに日時を更新
                    >
                      {room.name}
                    </a>
                    <p className="text-[#e8e8e8]">#{room.hashtag}</p>
                    <p className="text-[#e8e8e8] text-sm">
                      最終利用: {room.lastUsed}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className=" text-gray-500 py-1 px-3 rounded-md"
                      onClick={() => editRoom(index)}
                    >
                      編集
                    </button>
                  </div>
                </div>
                {/* 編集フォーム */}
                {editIndex === index && (
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      className="border-[#3f3f3f] border-[1.5px] rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
                      placeholder="ルーム名"
                      value={editRoomName}
                      onChange={(e) => setEditRoomName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border-[#3f3f3f] border-[1.5px] rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
                      placeholder="ハッシュタグ"
                      value={editHashtag}
                      onChange={(e) => setEditHashtag(e.target.value)}
                    />
                    <input
                      type="url"
                      className="border-[#3f3f3f] border-[1.5px] rounded-md p-2 w-full text-[#e8e8e8] bg-[#2f2f2f]"
                      placeholder="ルームのURL"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2 mt-4">
                      <div className="grow">
                        <button
                          className=" text-red-500 py-1 px-3 rounded-md"
                          onClick={() => deleteRoom(index)}
                        >
                          削除
                        </button>
                      </div>
                      <button
                        className="text-[#f8f8f8] py-1 px-3 rounded-md"
                        onClick={() => setEditIndex(null)}
                      >
                        キャンセル
                      </button>
                      <button
                        className="bg-[#f8f8f8] text-[#2f2f2f] py-2 px-4 rounded-md"
                        onClick={updateRoom}
                      >
                        更新
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
