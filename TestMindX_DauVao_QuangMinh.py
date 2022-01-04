
#Bui Quang Minh
#Test dau vao CI
#Bai 1:
'''
g = input("Nhap vao 1 day so, cach nhau boi dau ' ':")
alist = []
a = ''
print('Day so vua nhap theo chieu nguoc:')

if g[0] == ' ': #Neu co khoang trong ngay tu dau
    for i in g[1:]:
        if i.isdigit() == True:
            a += i
        elif i == ' ':
            alist += [int(a)]
            a = ''
else:
    for i in g:
        if i.isdigit() == True:
            a += i
        elif i == ' ':
            alist += [int(a)]
            a = ''
alist += [int(a)]
alist = alist[::-1]
for i in alist:
    print(i)
'''
#Bai 2
g = input("Nhap vao mot day so, cach nhau boi dau phay: ")
if len(g) > 1:
    alist = [] #cac so ban 
    blist = [] #cac cap so
    clist = [] #index cua cap so
    a = '' # moi so trong list
    for i in g:
        if i.isdigit() == True: #Neu character la so
            a += i #Cho vao mot string
        elif i == ',': #Co dau phay 
            alist += [int(a)] #Bien a thanh dang integer roi cho vao list
            a = ''
    alist += [int(a)]
    k = -1 #index cua i
    for i in alist:
        k += 1
        if i in blist:
            continue
        elif k != len(alist) - 1:
            for j in range(k + 1, len(alist)):
                if alist[j] in blist:
                    continue
                elif i*alist[j] == 256:
                    blist += i, alist[j]
                    clist += k, j
    if len(blist) != 0:
        print('Co nhung cap so sau co tich = 256:')
        for i in range(0, len(blist), 2):
            print(blist[i],'va',blist[i+1],'tai vi tri',clist[i],'va',clist[i+1])
