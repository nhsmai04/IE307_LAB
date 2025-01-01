

import axios from 'axios';

export async function getData({ table, id = null }) {
  try {
    // Kiểm tra nếu id có giá trị thì thêm vào URL
    const url = id ? `https://fakestoreapi.com/${table}/${id}` : `https://fakestoreapi.com/${table}`;
    console.log(url);
    // Thực hiện yêu cầu GET từ API
    const response = await axios.get(url);

    // In ra thông báo thành công
    console.log("Lấy dữ liệu thành công");

    // Trả về dữ liệu từ API
    return response.data;
  } catch (error) {
    // Ghi log lỗi nếu có
    console.error("Lỗi khi lấy dữ liệu: ", error.message);

    // Trả về mảng rỗng nếu có lỗi
    return [];
  }
}