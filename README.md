Hợp đồng thông minh CeloSaver

Đây là hợp đồng thông minh Solidity cốt lõi cho CeloSaver, một nền tảng tiết kiệm vi mô phi tập trung (DeFi) được xây dựng trên blockchain Celo. Hợp đồng này cho phép người dùng tạo các mục tiêu tiết kiệm cá nhân, gửi tiền vào đó và theo dõi tiến trình của họ một cách an toàn trên chuỗi.

Tổng quan

Hợp đồng CeloSaver hoạt động như một back-end phi tập trung cho ứng dụng di động CeloSaver. Nó được thiết kế để cung cấp sự bao gồm tài chính bằng cách cho phép bất kỳ ai có ví Celo bắt đầu tiết kiệm. Người dùng có toàn quyền kiểm soát tiền của mình và có thể tương tác với các mục tiêu tiết kiệm của họ bất kỳ lúc nào.

Phiên bản hợp đồng này hoạt động trực tiếp với tài sản gốc của Celo (CELO) thông qua msg.value.

Các tính năng

Tạo Mục tiêu: Người dùng có thể tạo nhiều mục tiêu tiết kiệm (SavingsGoal) với tên, số tiền mục tiêu và thời hạn tùy chỉnh.

Gửi tiền: Gửi tiền (CELO) một cách an toàn vào bất kỳ mục tiêu đang hoạt động nào.

Rút tiền: Rút một phần tiền từ một mục tiêu tiết kiệm.

Đóng Mục tiêu: Đóng một mục tiêu (cho dù đã hoàn thành hay chưa) và rút toàn bộ số dư còn lại.

Theo dõi: Hợp đồng theo dõi tổng số tiền tiết kiệm cho mỗi người dùng và tiến trình của từng mục tiêu riêng lẻ.

Sự kiện (Events): Phát ra các sự kiện cho các hành động quan trọng (tạo, gửi tiền, rút tiền, hoàn thành) để dễ dàng theo dõi bởi các ứng dụng front-end.

Cấu trúc và Logic cốt lõi

Struct SavingsGoal

Mỗi mục tiêu tiết kiệm được biểu thị bằng một cấu trúc (struct) lưu trữ:

name: Tên của mục tiêu (ví dụ: "Quỹ học phí", "Điện thoại mới").

targetAmount: Số tiền người dùng muốn tiết kiệm.

currentAmount: Số tiền hiện đã tiết kiệm được.

deadline: Dấu thời gian Unix (timestamp) khi mục tiêu hết hạn.

isActive: Một cờ boolean cho biết mục tiêu có đang hoạt động hay không (trở thành false khi đóng).

createdAt: Dấu thời gian khi mục tiêu được tạo.

Mappings

mapping(address => SavingsGoal[]) public userGoals;

Liên kết địa chỉ của người dùng với một mảng các mục tiêu tiết kiệm của họ. Đây là kho lưu trữ cốt lõi cho tất cả dữ liệu mục tiêu.

mapping(address => uint256) public totalSavings;

Một trình theo dõi tiện lợi để lưu tổng số tiền tiết kiệm của người dùng trên tất cả các mục tiêu đang hoạt động.

Các hàm chính (External Functions)

Dành cho Người dùng

createGoal(string memory _name, uint256 _targetAmount, uint256 _durationInDays)

Tạo một SavingsGoal mới cho msg.sender với các tham số đã cho.

deposit(uint256 _goalId)

Một hàm payable. Người dùng gọi hàm này và gửi CELO (thông qua msg.value) để thêm tiền vào mục tiêu có _goalId đã chỉ định.

withdraw(uint256 _goalId, uint256 _amount)

Rút _amount đã chỉ định từ _goalId và chuyển CELO về cho msg.sender.

closeGoal(uint256 _goalId)

Đặt mục tiêu thành isActive = false, tính toán toàn bộ currentAmount của mục tiêu đó và chuyển toàn bộ số dư về cho msg.sender.

Dành cho Chế độ xem (View Functions)

getUserGoals(address _user): Trả về một mảng chứa tất cả SavingsGoal của một người dùng.

getGoal(address _user, uint256 _goalId): Lấy thông tin chi tiết của một mục tiêu cụ thể.

getGoalCount(address _user): Trả về số lượng mục tiêu mà người dùng có.

getTotalSavings(address _user): Trả về tổng số CELO mà người dùng đã tiết kiệm trên tất cả các mục tiêu.

isGoalCompleted(address _user, uint256 _goalId): Trả về true nếu currentAmount >= targetAmount.

getGoalProgress(address _user, uint256 _goalId): Trả về tiến trình của mục tiêu dưới dạng phần trăm (0-100).

Triển khai và Kiểm thử

Hợp đồng này có thể được biên dịch và triển khai trên bất kỳ mạng nào tương thích EVM, nhưng nó được thiết kế cho Celo (ví dụ: Alfajores Testnet hoặc Celo Mainnet).

Biên dịch: Sử dụng trình biên dịch Solidity ^0.8.19.

Triển khai: Triển khai bằng các công cụ như Remix, Hardhat hoặc Truffle.

Tương tác: Gọi hàm createGoal để bắt đầu. Sau đó, gọi deposit và gửi kèm một giá trị (CELO) để thêm tiền tiết kiệm.

Các cải tiến trong tương lai

Tích hợp Stablecoin (ERC20): Để phù hợp hoàn toàn với sứ mệnh của dự án là bảo vệ người dùng khỏi biến động tiền tệ, hợp đồng có thể được sửa đổi để chấp nhận các stablecoin của Celo (ví dụ: cUSD, cREAL) làm tài sản tiết kiệm. Điều này sẽ yêu cầu thay đổi các hàm deposit, withdraw, và closeGoal để sử dụng transferFrom và transfer của ERC20 thay vì msg.value.

Tạo lãi suất: Tích hợp với các giao thức DeFi Celo khác (ví dụ: Mento) để cho phép người dùng kiếm được lợi suất từ số tiền tiết kiệm của họ.

Tuyên bố miễn trừ trách nhiệm: Mã này được cung cấp cho mục đích trình diễn và chưa được kiểm toán (audit) bảo mật. Không sử dụng trong môi trường sản xuất mà không có kiểm toán chuyên nghiệp.
